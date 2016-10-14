import _ from 'lodash'

const defaultPreferences = {
  price: [
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
      latitude: undefined,
      longitude: undefined,
      //just for autocomplete
      label: undefined
    },
    to: {
      mode: 'transit',
      latitude: undefined,
      longitude: undefined,
      label: undefined
    }
  }
};


export default function getDefaultDataStructure(meal, numGuests) {
  return {
    //one of dinner/drinks
    meal: meal,
    //2-5
    numGuests : numGuests,
    //preferences,voting,done
    stage: 'preferences',
    //array of user ids
    invitees : [],
    //array of user ids
    submittedPreferences : [],
    //array of user ids
    submittedVotes : [],
    matches: [],
    selectedMatch: null
  }

}
