import {
  hashHistory
} from 'react-router'
import config from 'config'
import firebase from './initializeFirebase'
import shortid from 'shortid'
import getDefaultDataStructure from 'data/defaultFirebaseData'

const database = firebase.database();

export function createInvitation() {

  return function(dispatch, getState) {
    var inviteId = shortid.generate();
    firebase.database()
      .ref(inviteId)
      .set(getDefaultDataStructure(getState().meal, getState().numGuests))
      .then(function() {
        dispatch(setInviteUrl(document.location.origin + '#/invite/' + inviteId));
        hashHistory.push('/get-invite-url');
      });
  }
}

export function setUserId(id) {
  return {
    type: 'SET_USERID',
    id
  }
}

export function setInviteId(id) {
  return {
    type: 'SET_INVITE_ID',
    id
  }
}

export function setInviteUrl(url) {
  return {
    type: 'SET_URL',
    url
  }
}

export function setFirebaseData(data) {
  return {
    type: 'SET_FIREBASE_DATA',
    data
  }
}

export function setName(name) {
  return {
    type: 'SET_NAME',
    name
  }
}

export function updateNumGuests(numGuests) {
  return {
    type: 'UPDATE_NUM_GUESTS',
    numGuests
  }
}


export function subscribeToFirebase(hash) {
  return function(dispatch, getState) {

    //set the hash into redux for later firebase actions
    dispatch(setInviteId(hash));

    const inviteRef = firebase.database().ref(hash);
    inviteRef.on('value', function(snapshot) {
      dispatch(setFirebaseData(snapshot.val()));
    });

    //update ref with my user id
    firebase.database()
      .ref(hash + '/invitees')
      .push(getState().userId);
    //create an entry in my user account
    firebase.database()
      .ref('users/' + getState().userId + '/' + getState().inviteId)
      .set({
        preferences: null,
        name: null
      });
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


export function updatePreferences(data) {
  return {
    type: 'UPDATE_PREFERENCES',
    data
  }
}

export function submitPreferencesToFirebase() {
  return function(dispatch, getState) {
    const preferencesPath = 'users/' + getState().userId + '/' + getState().inviteId + '/preferences';
    firebase.database()
      .ref(preferencesPath)
      .set(getState().preferences);

    //and duplicate the data by adding a user key for easy retrieval
    firebase.database()
      .ref(getState().inviteId + '/submittedPreferences')
      .push(getState().userId);

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
