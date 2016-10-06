
import { combineReducers } from 'redux'
import matches from './matches'
import meal from './meal'
import preferences from './preferences'
import visibleUsers from './visibleUsers'

import defaultState from 'store/defaultState'
import _ from 'lodash'

var appReducer = combineReducers({
  visibleUsers,
  meal,
  preferences,
  matches
});

export default (state, action) => {
  if (action.type === 'RESET')   state = _.cloneDeep(defaultState);
  return appReducer(state, action);
}
