
import { combineReducers } from 'redux'
import matches from './matches'
import preferences from './preferences'
import inviteUrl from './inviteUrl'
import meal from './meal'

import defaultState from 'store/defaultState'
import _ from 'lodash'

var appReducer = combineReducers({
  meal,
  inviteUrl,
  preferences,
  matches
});

export default (state, action) => {
  if (action.type === 'RESET')   state = _.cloneDeep(defaultState);
  return appReducer(state, action);
}
