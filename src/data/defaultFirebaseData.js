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


export default function getDefaultDataStructure() {
  return {
    //duplicated to make server interaction with firebase data easier
    inviteId: undefined,
    //one of dinner/drinks
    meal: undefined,
    admin: undefined,
    //preferences,voting,done
    stage: 'preferences',
    //object with preferences from all invitees
    preferences : {},
    //object with id : name pairs from all invitees
    nameDict : {},
    matches: [],
    //dict of { restaurantIDs : [userid1, userid2] }
    submittedVotes : {},
    finalRecommendation : null
  }

}
