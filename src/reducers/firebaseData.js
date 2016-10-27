

export default function reducer(data = {}, action){
  switch (action.type) {
    case 'SET_FIREBASE_DATA':
      return action.data;
    case 'UPDATE_FIREBASE_DATA':
      return Object.assign({}, data, action.data)
    default:
      return data;
  }
}
