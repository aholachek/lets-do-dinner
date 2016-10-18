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


export default function getDefaultDataStructure(meal, numGuests, hash) {
  return {
    //duplicated to make server interaction with firebase data easier
    inviteId: hash,
    //one of dinner/drinks
    meal: meal,
    //2-5
    numGuests : numGuests,
    //preferences,voting,done
    stage: 'preferences',
    //object with preferences
    preferences : {},
    matches: [],
    //dict of { restaurantIDs : [userid1, userid2] }
    submittedVotes : {},
    finalRecommendation : null
  }

}
