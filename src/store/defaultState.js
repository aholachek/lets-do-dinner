import _ from 'lodash'

const defaultPreferences =  { price: [
    1, 2
  ],
  cuisine: {
    yes: [
    ],
    no: [
    ]
  },
  locations: {
    from: {
      mode: 'transit',
      latitude: null,
      longitude: null,
      //just for autocomplete
      label : null
    },
    to: {
      mode: 'transit',
      latitude: null,
      longitude: null,
      label : null
    }
  }
};

const defaultState = {
//one of Dinner/Drinks
meal : 'Dinner',
notificationsOn : true,
numGuests : 2,
userId : undefined,
name : undefined,
//name-id pairs for other people
userDict : {},
preferences : defaultPreferences,
votes : [],
firebaseData : {},
inviteId : undefined,
inviteUrl : undefined
}

export default defaultState
