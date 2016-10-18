import {
  hashHistory
} from 'react-router'
import config from 'config'
import firebase from './initializeFirebase'
import shortid from 'shortid'
import getDefaultDataStructure from 'data/defaultFirebaseData'
import notifications from 'html5-desktop-notifications';


const database = firebase.database();

function getInviteUrl(hash) {
  return 'invites/' + hash;
}

function transformMeal(meal) {
  if (meal === 'Drinks') meal = 'Bars';
  return meal;
}

export function createInvitation() {

  return function(dispatch, getState) {
    var inviteId = shortid.generate();
    firebase.database()
      .ref(getInviteUrl(inviteId))
      .set(getDefaultDataStructure(transformMeal(getState().meal), getState().numGuests, inviteId))
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

export function setNotifications(bool) {

  return {
    type: 'SET_NOTIFICATIONS',
    notificationsOn : bool
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

    const inviteRef = firebase.database().ref(getInviteUrl(hash));
    inviteRef.on('value', function(snapshot) {
      const data = snapshot.val();
      // when matches are added,
      // add them all to votes so they are preselected
      // also notify user 1x if notifications are enabled
      if (!getState().firebaseData.matches && data.matches) {
        data.matches.forEach(function(m) {
          dispatch(updateVote(m.id));
        });

        if (Notification.permission === 'granted'){
          const n = new Notification('Lets Do Dinner', {
            body : 'It\'s time to vote!'
          });
        }

      }
      //when final result is added, notify user if notifications are enabled
      if (Notification.permission === 'granted'){
        const n = new Notification('Lets Do Dinner', {
          body : 'The votes have been tallied! Check out where you\'re going.'
        });
      }

      dispatch(setFirebaseData(data));
    });

    //subscribe to user added
    firebase.database().ref(getInviteUrl(hash) + '/preferences')
      .on('child_added', function(child) {
        //get the name, and add it to a local dict of id : name hashes
        const val = child.val();
        const id = val.userId;
        firebase.database().ref(`/users/${id}`).once('value', function(x) {
          dispatch(updateUserDict({
            [id]: x.val().name
          }));
        });
      });

    //update ref with my user id
    firebase.database()
      .ref(getInviteUrl(hash) + '/invitees')
      .push(getState().userId);
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

function transformPreferences(preferences) {
  //remove ui information (text value of cuisine tags)
  preferences.cuisine.yes = preferences.cuisine.yes.map((obj) => obj.id);
  preferences.cuisine.no = preferences.cuisine.no.map((obj) => obj.id);
  return preferences;
}

export function submitPreferencesToFirebase() {
  return function(dispatch, getState) {
    const userPath = 'users/' + getState().userId + '/';
    const userRef = firebase.database().ref(userPath);

    let preferences = transformPreferences(getState().preferences);
    //convenience so later can use firebase's child_added
    preferences.userId = getState().userId;

    //stash preferences to autofill the next time
    userRef.set({
      name: getState().name,
      preferences: preferences
    })

    firebase.database()
      .ref(getInviteUrl(getState().inviteId) + '/preferences')
      .update({
        [getState().userId]: preferences
      });

      //finally, if notifications are enabled, request permission for app
      if (getState().notificationsOn){

        Notification.requestPermission().then(function(permission){
        });

      }
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

export function updateVote(id) {
  return {
    type: 'UPDATE_VOTE',
    id
  }
}

export function submitVotesToFirebase() {
  return function(dispatch, getState) {
    const submittedVotesRef = firebase.database()
      .ref(`${getInviteUrl(getState().inviteId)}/submittedVotes`);

    submittedVotesRef
      .once('value')
      .then(function(snapshot) {
        const voteObj = snapshot.val() || {};
        const userVotes = getState().votes;
        const userId = getState().userId;

        //add my user id to arrays of votes
        userVotes.forEach(function(placeId) {
          if (voteObj[placeId]) voteObj[placeId].push(userId);
          else {
            voteObj[placeId] = [userId]
          }
        });

        //set new object back into firebase
        submittedVotesRef.set(voteObj);
      });
  }
}

export function updateUserDict(dict) {
  return {
    type: 'UPDATE_USER_DICT',
    dict
  }
}
