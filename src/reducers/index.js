
import { combineReducers } from 'redux'
import preferences from './preferences'
import meal from './meal'
import userId from './userId'
import inviteId from './inviteId'
import firebaseData from './firebaseData'
import votes from './votes'
import userDict from './userDict'
import notificationsOn from './notificationsOn';

import defaultState from 'store/defaultState'
import _ from 'lodash'

var appReducer = combineReducers({
  meal,
  preferences,
  userId,
  firebaseData,
  inviteId,
  votes,
  userDict,
  notificationsOn
});

export default (state, action) => {
  if (action.type === 'RESET')   state = _.cloneDeep(defaultState);
  return appReducer(state, action);
}
