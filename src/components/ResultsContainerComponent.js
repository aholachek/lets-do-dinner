'use strict';

import React from 'react';
import ResultsList from './ResultsListComponent';
import ResultsMap from './ResultsMapComponent';
import { connect } from 'react-redux';
import _ from 'lodash';


function mapStateToProps(state){
  return {
    matches : state.matches.data,
    preferences : state.preferences
  }
}

var location = 'location';
var preference = 'best match';

class MatchesContainerComponent extends React.Component {

  constructor (){
    super();
    this.state = {
      //one of 'preferences'/'location'
      sort : preference
    }
    this.renderFilterButtons = this.renderFilterButtons.bind(this);
  }

  renderFilterButtons() {

    return [location, preference].map(function(w){

      var onClick = function(){
        this.setState({sort : w});
      }.bind(this);

      var cn = (w === this.state.sort) ?
       "btn btn-secondary-darker" :
       "btn btn-secondary";

     return (<button
       type="button"
       className={cn}
        key={w + '-btn'}
        onClick={onClick} >
        {w}
      </button>)

    }, this);

  }

  render() {

    var recordsToShow = _.sortBy(this.props.matches,function(m){
      if (this.state.sort === location){
        return m.time.total;
      } else if (this.state.sort === preference ){
        return -m.preferenceScore;
      }
    }, this);

    return  (
      <div className="matchescontainer-component">
        <h2>Suggestions</h2>
        <p>Ranked by distance, user preferences, and Yelp star rating</p>
        <hr/>
          <div className="results-ranking">
              <span>Rank matches by:&nbsp;&nbsp;</span>
              <div className="btn-group" role="group">
              {this.renderFilterButtons()}
            </div>
          </div>
            <div className="results-container">
              <ResultsList
                data={recordsToShow}
                userData={this.props.preferences} />
              <ResultsMap
                data={recordsToShow.slice(0,9)}
                userData={this.props.preferences} />
          </div>
    </div>
    );
  }
}


export default connect(
  mapStateToProps,
)(MatchesContainerComponent);
