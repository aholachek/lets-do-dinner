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


export default function getDefaultDataStructure(meal) {
  return {
    //one of dinner/drinks
    meal: meal,
    //preferences,voting,done
    stage: 'preferences',

    preferences: {},
    matches: [],
    selectedMatch: null
  }

}
