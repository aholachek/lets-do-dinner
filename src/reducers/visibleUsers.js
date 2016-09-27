

export default function reducer(state = 5, action){

  switch (action.type) {
    case 'UPDATE_VISIBLE':
      return action.val
    default:
      return state
  }

}
