

export default function reducer(data = {}, action){
  debugger
  switch (action.type) {
    case 'SET_FIREBASE_DATA':
      return action.data
    default:
      return data;
  }

}
