

export default function reducer(state = {}, action){

  switch (action.type) {
    case 'UPDATE_PREFERENCES':
      return Object.assign(
        {},
        state,
        { [action.id] : Object.assign({}, state[action.id], action.data) }
      )
    default:
      return state
  }

}
