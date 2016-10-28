import _ from 'lodash'
import { defaultPreferences } from './../store/defaultState'

export default function reducer(state = {}, action){

  switch (action.type) {
    case 'UPDATE_PREFERENCES':
      return Object.assign({}, state, action.data);
    case 'RESET_PREFERENCES':
      return _.cloneDeep(defaultPreferences);
    default:
      return state
  }

}
