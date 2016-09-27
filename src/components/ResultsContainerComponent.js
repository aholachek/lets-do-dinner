'use strict';

import React from 'react';
import ResultsList from './ResultsListComponent';
import ResultsMap from './ResultsMapComponent';
import { connect } from 'react-redux'


function mapStateToProps(state){
  return {
    matches : state.matches.data,
    preferences : state.preferences
  }
}

class MatchesContainerComponent extends React.Component {
  render() {
    return (
      <div className="matchescontainer-component">
        <h2>Suggestions</h2>
        <p>Ranked by distance, user preferences, and Yelp star rating</p>
        <hr/>
        <div className="results-container">
          <ResultsList
            data={this.props.matches.slice(0, 9)}
            userData={this.props.preferences}
            />
          <ResultsMap
            data={this.props.matches.slice(0, 9)}
            userData={this.props.preferences}/>
        </div>
      </div>
    );
  }
}


export default connect(
  mapStateToProps,
)(MatchesContainerComponent);
