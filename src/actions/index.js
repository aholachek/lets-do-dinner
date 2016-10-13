import { hashHistory } from 'react-router'
import config from 'config'
import firebase from './initializeFirebase'
import shortid from 'shortid'
import getDefaultDataStructure from 'data/defaultFirebaseData'

const database = firebase.database();

export function createInvitation(meal){

  return function (dispatch, getState){
    var inviteId = shortid.generate();
    firebase.database()
    .ref(inviteId)
    .set(getDefaultDataStructure(getState().meal))
    .then(function(){
      dispatch(setInviteUrl(document.location.origin + '#/invitation/' + inviteId));
      hashHistory.push('/get-invite-url');
    });
  }

}

export function setInviteUrl(url) {
  return {
    type: 'SET_URL',
    url
  }
}

export function updateMeal(meal) {
  return function(dispatch, getState) {

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

export function fetchMatches() {

  return function(dispatch, getState) {

    dispatch(requestMatches());

    const state = _.cloneDeep(getState());

    //need a better way to make sure everyone at least gets a location
    state.preferences = _.filter(state.preferences, function(p) {
      if (p.locations.from.latitude) return true
    });

    //remove ui information
    state.preferences.forEach(function(p) {
      p.cuisine.yes = p.cuisine.yes.map((obj) => obj.id);
      p.cuisine.no = p.cuisine.no.map((obj) => obj.id);
    });

    //use a better search term
    if (state.meal === 'Drinks') {
      state.meal = 'Bars';
      //not sure why this is necessary but yelp api is returning non-bar results
      state.preferences.forEach(function(p) {
        p.cuisine.yes.push('bars')
      });
    }

    const dataObj = {
      term: state.meal,
      userData: state.preferences
    }

    fetch(config.api_endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataObj)
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        console.error("request failed", response);
        dispatch(matchesFailed());
        throw new Error();
      }
    }).then((data) => {
      dispatch(receiveMatches(data));
      //navigate to matches page
      hashHistory.push('results');
    }).catch(() => {
      hashHistory.push('error');
    });
  }
}
