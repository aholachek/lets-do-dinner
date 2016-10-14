

export default function reducer(id= '', action){

  switch (action.type) {
    case 'SET_USERID':
      return action.id
    default:
      return id;
  }

}
