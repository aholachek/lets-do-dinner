

export default function reducer(state = {}, action){

  switch (action.type) {
    case 'UPDATE_PREFERENCES':
      return Object.assign({}, state, action.data);
    default:
      return state
  }
  
}
