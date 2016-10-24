

export default function reducer(data = {}, action){
  switch (action.type) {
    case 'SET_FIREBASE_DATA':
      return action.data
    default:
      return data;
  }
}
