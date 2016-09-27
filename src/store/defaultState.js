import _ from 'lodash'

const defaultPreferences =  { price: [
    1, 2
  ],
  cuisine: {
    yes: [
      {
        id: 'tradamerican',
        text: 'American'
      }
    ],
    no: [
      {
        id: 'pizza',
        text: 'pizza'
      }
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

preferences : {},

//one of Dinner/Drinks/Brunch
meal : 'Dinner',

matches : {
  //one of loading/error/success
  requestState : undefined,
  data : []
},


}

_.range(1,6).forEach(function(num){
  defaultState.preferences['Person ' + num] = _.cloneDeep(defaultPreferences);
});


export default defaultState
