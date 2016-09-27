
import { combineReducers } from 'redux'
import matches from './matches'
import meal from './meal'
import preferences from './preferences'
import visibleUsers from './visibleUsers'


export default combineReducers({
  visibleUsers,
  meal,
  preferences,
  matches
});
