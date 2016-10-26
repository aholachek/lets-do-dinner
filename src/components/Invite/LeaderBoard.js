import React, {PropTypes} from 'react';
import ResultListItem from './ResultListItem';
import { connect } from 'react-redux';
import _ from 'lodash';


function sortMatches(matches, votes) {

//secondary sort by travel time
let sorted = _.sortBy(matches, function(m){
  return m.time.total
});

//most importantly, rank by votes
sorted = _.sortBy(sorted, function(m){
  return -_.uniq(votes[m.id]).length
});

return sorted

}

function mapStateToProps(state){
  return {
    matches : state.firebaseData.matches,
    preferences : state.firebaseData.preferences,
    userId : state.userId,
    submittedVotes : state.firebaseData.submittedVotes,
    nameDict : state.firebaseData.nameDict
  }
}


class LeaderBoard extends React.Component {

  renderVoters() {
    const submittedVotes = this.props.submittedVotes;

    return (<div className='user-progress-container centered-flex'>
      { _.keys(this.props.nameDict).map(function(key){
        const submitted = _.flatten(_.values(submittedVotes)).indexOf(key) > -1;
          let icon = submitted ? <i className="fa fa-check-square-o fa-lg text-success"/>:
        <i className="fa fa-square-o fa-lg burst-animation"/> ;
          return <div className={submitted ? '' : 'text-muted'}>
            {this.props.nameDict[key]}&nbsp;{icon}
          </div>
      }, this)
      }</div>)

  }

  renderWinner(match) {
    return this.renderListItem.call(this, match, 0, true)
  }

  renderListItem (match, index, winner) {
    //get total minutes for this user to this destination
    let time = match.time.origins[this.props.userId];
    let userData = this.props.preferences[this.props.userId];
    let submittedVotes = this.props.submittedVotes[match.id].map(function(v){
      return this.props.nameDict[v]
    }, this);

    return (
      <ResultListItem
        data={match}
        collapsed={false}
        updateVote={this.props.updateVote}
        time={time}
        userData ={userData}
        key={match.id}
        index={index}
        shouldRenderVotes={true}
        submittedVotes={submittedVotes}
        winner={winner || false}
      />
    )
  }

  render() {
    var sortedMatches = sortMatches(this.props.matches, this.props.submittedVotes);
    return (
      <div className="centered-component">
        <h2>Ranked Recommendations</h2>
        <div className="lead" style={{margin: '0 0 .5rem 0'}}>
          This list will update as more people vote.
        </div>
        <hr/>
        <div>
          <div className="flex">
            { this.renderVoters() }
          </div>
        </div>
        <div>
          {this.renderWinner(sortedMatches[0])}
        </div>
        {sortedMatches.slice(1).map(function(m,i){
          return this.renderListItem(m, i + 1)
        }, this)}
      </div>
    )
}
}

LeaderBoard.propTypes = {
};

export default connect(
  mapStateToProps
)(LeaderBoard);
