import React from 'react';
import ResultListItem from './ResultListItem';
import {connect} from 'react-redux';
import _ from 'lodash';

function sortMatches(matches, votes) {
  //secondary sort by travel time
  let sorted = _.sortBy(matches, function(m) {
    return m.time.total
  });

  //most importantly, rank by votes
  sorted = _.sortBy(sorted, function(m) {
    return -_.uniq(votes[m.id]).length
  });

  return sorted
}

function mapStateToProps(state) {
  return {
    matches: state.firebaseData.matches,
    preferences: state.firebaseData.preferences,
    userId: state.userId,
    submittedVotes: state.firebaseData.submittedVotes,
    nameDict: state.firebaseData.nameDict
   }
}

class LeaderBoard extends React.Component {

  renderWinner(match) {
    return this.renderListItem.call(this, match, 0, true)
  }

  renderListItem(match, index, winner) {
    //get total minutes for this user to this destination
    let time = match.time.origins[this.props.userId];
    let userData = this.props.preferences[this.props.userId];
    let submittedVotes = this.props.submittedVotes[match.id] || [];
    submittedVotes = submittedVotes.map(function(v) {
      return this.props.nameDict[v]
    }, this);

    return (<ResultListItem
      data={match}
      collapsed={false}
      time={time}
      userData ={userData}
      key={match.id}
      index={index}
      shouldRenderVotes={true}
      submittedVotes={submittedVotes}
      winner={winner || false}/>)
  }

  render() {
    var sortedMatches = sortMatches(this.props.matches, this.props.submittedVotes);
    return (
      <div className="centered-component" style={{
        marginTop: '1.5rem'
      }}>
        <h2>Ranked Recommendations</h2>
        <div className="lead" style={{
          margin: '0 0 .5rem 0'
        }}>
          This list will update as more people vote.
        </div>
        <div>
          It's sorted by total votes and total travel time.
        </div>

        <div>
          {this.renderWinner(sortedMatches[0])}
        </div>
        {sortedMatches.slice(1).map(function(m, i) {
          return this.renderListItem(m, i + 1)
        }, this)}
      </div>
    )
  }
}

LeaderBoard.propTypes = {
  matches: React.PropTypes.array.isRequired,
  preferences: React.PropTypes.object.isRequired,
  userId: React.PropTypes.string.isRequired,
  submittedVotes: React.PropTypes.object.isRequired,
  nameDict: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(LeaderBoard);
