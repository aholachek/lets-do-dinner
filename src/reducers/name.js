

export default function reducer(name='', action){

  switch (action.type) {
    case 'SET_NAME':
      return action.name
    default:
      return name;
  }

}
