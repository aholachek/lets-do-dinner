
import { combineReducers } from 'redux'
import matches from './matches'
import preferences from './preferences'
import inviteUrl from './inviteUrl'
import meal from './meal'
import name from './name'
import userId from './userId'
import inviteId from './inviteId'
import firebaseData from './firebaseData'
import numGuests from './numGuests'

import defaultState from 'store/defaultState'
import _ from 'lodash'

var appReducer = combineReducers({
  name,
  meal,
  inviteUrl,
  preferences,
  matches,
  userId,
  firebaseData,
  inviteId,
  numGuests
});

export default (state, action) => {
  if (action.type === 'RESET')   state = _.cloneDeep(defaultState);
  return appReducer(state, action);
}
