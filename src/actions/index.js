import { hashHistory } from 'react-router'

export function updateMeal(meal) {
  return {
    type: 'UPDATE_MEAL',
    meal
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

export function fetchMatches() {

  return function(dispatch, getState) {

    dispatch(requestMatches());

    const state = _.cloneDeep(getState());

    //need a better way to make sure everyone at least gets a location
    state.preferences = _.filter(state.preferences, function(p){
      if (p.locations.from.latitude) return true
    });

    //remove ui information
    state.preferences = _.forEach(state.preferences, function(v,k){
      v.cuisine.yes = v.cuisine.yes.map((obj)=> obj.id);
      v.cuisine.no = v.cuisine.no.map((obj)=> obj.id);
    });

    const dataObj = {
      term : state.meal,
      userData : state.preferences
    }

    fetch('http://localhost:4000', {
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

      dispatch(receiveMatches(data));
      //navigate to matches page
      hashHistory.push('results');
    });

  }
}
