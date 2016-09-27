



export default function reducer(state = 'dinner', action){

  switch (action.type) {
    case 'UPDATE_MEAL':
      return action.meal
    default:
      return state
  }

}
