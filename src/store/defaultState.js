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
numGuests : 2,
userId : undefined,
name : undefined,
preferences : defaultPreferences,
votes : undefined,
firebaseData : {},
inviteId : undefined,
inviteUrl : undefined
}

export default defaultState
