

export default function reducer(state = {}, action){

  switch (action.type) {
    case 'REQUEST_MATCHES':
      return Object.assign({}, state, {requestState : 'loading'})
      break;
    case 'RECEIVE_MATCHES':
    //add preference scores
      return Object.assign({}, state, {requestState : 'success', data : action.data });
    case 'MATCHES_FAILED':
      return Object.assign({}, state, {requestState : 'error'});
    default:
      return state
  }

}
