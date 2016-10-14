

export default function reducer(guests=0, action){

  switch (action.type) {
    case 'UPDATE_NUM_GUESTS':
      return action.numGuests
    default:
      return guests;
  }

}
