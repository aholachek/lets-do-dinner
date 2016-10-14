

export default function reducer(id= '', action){

  switch (action.type) {
    case 'SET_INVITE_ID':
      return action.id
    default:
      return id;
  }

}
