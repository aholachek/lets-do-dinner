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
      mode: 'driving',
      latitude: null,
      longitude: null,
      //just for autocomplete
      label : null
    },
    to: {
      mode: 'driving',
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
userId : undefined,
//name-id pairs for other people
userDict : {},
preferences : defaultPreferences,
votes : [],
firebaseData : {},
inviteId : undefined
}

export default defaultState
