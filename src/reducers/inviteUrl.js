

export default function reducer(url = '', action){

  switch (action.type) {
    case 'SET_URL':
      return action.url
    default:
      return url
  }

}
