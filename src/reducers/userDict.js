

export default function reducer(dict={}, action){

  switch (action.type) {
    case 'UPDATE_USER_DICT':
      return Object.assign({}, dict, action.dict)
    default:
      return dict;
  }

}
