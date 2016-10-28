import {hashHistory} from 'react-router'
import config from 'config'
import firebase from './initializeFirebase'
import shortid from 'shortid'
import getDefaultDataStructure from 'data/defaultFirebaseData'
import notifications from 'html5-desktop-notifications';
import _ from 'lodash';
import moment from 'moment';

const database = firebase.database();

function getInvitePath(hash) {
  return 'invites/' + hash;
}

function createInviteURL(id) {
  return document.location.origin + document.location.pathname + '#/invite/' + id
}

export function createInvitation(hours) {

  return function(dispatch, getState) {
    var inviteId = shortid.generate();
    var inviteUrl = createInviteURL(inviteId);

    var data = getDefaultDataStructure();
    data.meal = getState().meal;
    data.inviteId = inviteId;
    data.admin = getState().userId;
    data.inviteUrl = inviteUrl;
    data.createdAt = new Date();
    data.dueAt = moment(data.createdAt).add(hours, 'h').toDate().toUTCString();
    data.createdAt = data.createdAt.toUTCString();

    firebase.database().ref(getInvitePath(inviteId)).set(data).then(function() {
      //get these things in place for the admin earlier than everyone else
      dispatch(setFirebaseData({inviteUrl: inviteUrl, dueAt: data.dueAt}));
      hashHistory.push('/get-invite-url/' + inviteId);
    });

  }
}

export function setUserId(id) {
  return {type: 'SET_USERID', id}
}

export function setInviteId(id) {
  //keep things consistent
  return function(dispatch) {
    dispatch({type: 'SET_INVITE_ID', id});
    dispatch(updateFirebaseData({inviteUrl: createInviteURL(id)}));
  }
}

export function setFirebaseData(data) {
  return {type: 'SET_FIREBASE_DATA', data}
}

export function updateFirebaseData(data) {
  return {type: 'UPDATE_FIREBASE_DATA', data}
}

export function submitNameToFirebase(name) {
  return function(dispatch, getState) {
    const userPath = 'users/' + getState().userId + '/';
    const userRef = firebase.database().ref(userPath);

    userRef.update({name: name});

    //for now, just reproducing this data, maybe later allow override
    firebase.database().ref(getInvitePath(getState().inviteId) + '/nameDict').update({
      [getState().userId]: name
    });

  }
}

export function setNotifications(bool) {
  return {type: 'SET_NOTIFICATIONS', notificationsOn: bool}
}

export function clearVotes() {
  return {type: 'CLEAR_VOTES'}
}

let inviteRef;

export function subscribeToFirebase(hash) {
  return function(dispatch, getState) {
    //set the hash into redux for later firebase actions
    dispatch(setInviteId(hash));
    dispatch(resetPreferences());
    //clear votes if they're there from a prior invite

    if (inviteRef){ inviteRef.off() }
    inviteRef = firebase.database().ref(getInvitePath(hash));
    inviteRef.on('value', function(snapshot) {
      const data = snapshot.val();
      if (!data){ return }

      // when matches are added,
      // add them all to votes so they are preselected
      // also notify user 1x if notifications are enabled
      if (!getState().firebaseData.matches && data.matches) {
        data.matches.forEach(function(m) {
          dispatch(updateVote(m.id));
        });

        if (Notification.permission === 'granted' && document.hidden) {
          if (getState().meal === 'Dinner') {
            const n = new Notification('Let\'s Do Dinner', {
              body: 'It\'s time to vote!',
              icon: config.img_endpoint + 'app_icon.png'
            });
          } else if (getState().meal === 'Drinks') {
            const n = new Notification('Let\'s Do Drinks', {
              body: 'It\'s time to vote!',
              icon: config.img_endpoint + 'app_icon_drinks.png'
            });
          }
        }
      }

      //this must come after everything else
      dispatch(setFirebaseData(data));
      //in case someone's coming in from a url
      dispatch(updateMeal(data.meal));

    });

  }
}

export function updateMeal(meal) {
  return {type: 'UPDATE_MEAL', meal}
}

export function updatePreferences(data) {
  return {type: 'UPDATE_PREFERENCES', data}
}
export function resetPreferences() {
  return {type: 'RESET_PREFERENCES'}
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

    let preferences = transformPreferences(_.cloneDeep(getState().preferences));
    //convenience so later can use firebase's child_added
    preferences.userId = getState().userId;

    //stash preferences to autofill the next time
    userRef.set({preferences: preferences});

    firebase.database().ref(getInvitePath(getState().inviteId) + '/preferences').update({
      [getState().userId]: preferences
    });

    //finally, if notifications are enabled, request permission for app
    if (getState().notificationsOn) {

      Notification.requestPermission().then(function(permission) {});

    }
  }
}

export function updateVote(id) {
  return {type: 'UPDATE_VOTE', id}
}

export function submitVotesToFirebase() {
  return function(dispatch, getState) {
    const submittedVotesRef = firebase.database().ref(`${getInvitePath(getState().inviteId)}/submittedVotes`);

    submittedVotesRef.once('value').then(function(snapshot) {
      const voteObj = snapshot.val() || {};
      const userVotes = getState().votes;
      const userId = getState().userId;

      //add my user id to arrays of votes
      userVotes.forEach(function(placeId) {
        if (voteObj[placeId])
          voteObj[placeId].push(userId);
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
  return {type: 'UPDATE_USER_DICT', dict}
}

export function moveToNextStage() {
  return function(dispatch, getState) {
    const stage = getState().firebaseData.stage;
    let newStage;
    if (stage === 'preferences') {
      newStage = 'voting'
    } else if (stage === 'voting') {
      newStage = 'done'
    }

    function contactFirebase() {
      firebase.database().ref(getInvitePath(getState().inviteId)).update({stage: newStage});
    }
    if (config['free_tier']) {
      wakeUpDyno();
      setTimeout(contactFirebase, 2000);
    } else {
      contactFirebase();
    }

  }
}

function wakeUpDyno() {

  fetch(config.api_endpoint, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (response.status === 200) {
      return
    } else {
      console.error("request failed", response);
    }
  });
}
