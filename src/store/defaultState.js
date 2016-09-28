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
      latitude: undefined,
      longitude: undefined
    },
    to: {
      mode: 'transit',
      latitude: undefined,
      longitude: undefined
    }
  }
};

const defaultState = {

visibleUsers : 2,

preferences : [],

//one of Dinner/Drinks
meal : 'Dinner',

matches : {
  //one of loading/error/success
  requestState : undefined,
  data : []
},

}

_.range(1,6).forEach(function(num){
  defaultState.preferences.push(
  Object.assign({}, _.cloneDeep(defaultPreferences), { userId : 'Person ' + num })
  )
});


export default defaultState
