

export default function reducer(notificationsOn=true, action){

  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return action.notificationsOn
    default:
      return notificationsOn;
  }

}
