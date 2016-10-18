import _ from 'lodash'

export default function reducer(votes=[], action){

  switch (action.type) {
    case 'UPDATE_VOTE':
    if (votes.indexOf(action.id) > -1){
      return _.without(votes, action.id);
    } else {
      return votes.concat([action.id])
    }
    default:
      return votes;
  }

}
