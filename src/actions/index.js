import { hashHistory } from 'react-router'
import config from 'config';


export function updateMeal(meal) {
  return function(dispatch, getState){
    
    const cachedVis = getState().visibleUsers;

    //hack
    dispatch(reset());

    dispatch({
      type: 'UPDATE_MEAL',
      meal
    });
   dispatch(updateVisible(cachedVis))
  }
}

export function reset() {
  return {
    type: 'RESET'
  }
}

export function updateVisible(val) {
  return {
    type: 'UPDATE_VISIBLE',
    val
  }
}

export function updatePreferences(id, data) {
  return {
    type: 'UPDATE_PREFERENCES',
    id,
    data
  }
}

export function requestMatches() {

  return {
    type: 'REQUEST_MATCHES'
  }

}

export function receiveMatches(data) {

  return {
    type: 'RECEIVE_MATCHES',
    data
  }

}

export function matchesFailed() {

  return {
    type: 'MATCHES_FAILED',
  }

}

//how much does each restaurant match users' preferences?
function addPreferenceScores( matches, preferences ){

  var preferenceDict = _.countBy(
    _.flatten(preferences.map(function(p){
      return p.cuisine.yes.map(function(p){
        return p.id;
      })
    })
  )
);

matches.forEach(function(m){
  var categories = m.categories.map(function(c){ return c.alias });
  var score = _.sum(categories.map(function(c){
    if (preferenceDict[c]) return preferenceDict[c];
    else return 0
  }));
  m.preferenceScore = score;
});

}

export function fetchMatches() {

  return function(dispatch, getState) {

    dispatch(requestMatches());

    const state = _.cloneDeep(getState());

    //need a better way to make sure everyone at least gets a location
    state.preferences = _.filter(state.preferences, function(p){
      if (p.locations.from.latitude) return true
    });

    //remove ui information
    state.preferences.forEach(function(p){
      p.cuisine.yes = p.cuisine.yes.map((obj)=> obj.id);
      p.cuisine.no = p.cuisine.no.map((obj)=> obj.id);
    });

    //use a better search term
    if (state.meal === 'Drinks') {
      state.meal = 'Bars';
      //not sure why this is necessary but yelp api is returning non-bar results
      state.preferences.forEach(function(p){
        p.cuisine.yes.push('bars')
      });
    }

    const dataObj = {
      term : state.meal,
      userData : state.preferences
    }

    fetch(config.api_endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataObj)
    }).then((response)=> {
      if (response.status === 200) {
        return response.json();
      } else {
        console.error("request failed", response);
        dispatch(matchesFailed());
        throw new Error()
      }
    }).then((data)=> {

      addPreferenceScores(data, getState().preferences);

      dispatch(receiveMatches(data));
      //navigate to matches page
      hashHistory.push('results');
    }).catch(()=>{
      hashHistory.push('error');
    });

  }
}
