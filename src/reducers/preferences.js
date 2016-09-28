

export default function reducer(state = [], action){

  switch (action.type) {
    case 'UPDATE_PREFERENCES':
    const ind = _.findIndex(state, {userId : action.id});
    var newData = Object.assign({}, state[ind], action.data);
    return state.slice(0, ind).concat([newData]).concat(state.slice(ind + 1));
    default:
      return state
  }

}
