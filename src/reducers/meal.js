

export default function reducer(meal = 'dinner', action){

  switch (action.type) {
    case 'UPDATE_MEAL':
      return action.meal
    default:
      return meal
  }

}
