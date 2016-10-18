
import { combineReducers } from 'redux'
import preferences from './preferences'
import inviteUrl from './inviteUrl'
import meal from './meal'
import name from './name'
import userId from './userId'
import inviteId from './inviteId'
import firebaseData from './firebaseData'
import numGuests from './numGuests'
import votes from './votes'
import userDict from './userDict'
import notificationsOn from './notificationsOn';

import defaultState from 'store/defaultState'
import _ from 'lodash'

var appReducer = combineReducers({
  name,
  meal,
  inviteUrl,
  preferences,
  userId,
  firebaseData,
  inviteId,
  numGuests,
  votes,
  userDict,
  notificationsOn
});

export default (state, action) => {
  if (action.type === 'RESET')   state = _.cloneDeep(defaultState);
  return appReducer(state, action);
}
