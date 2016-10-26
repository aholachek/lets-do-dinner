'use strict';

import React from 'react';
import ResultsList from './ResultsListComponent';
import ResultsMap from './ResultsMapComponent';
import { connect } from 'react-redux';
import _ from 'lodash';
import { updateVote, submitVotesToFirebase } from 'actions/index';


function mapStateToProps(state){
  return {
    matches : state.firebaseData.matches,
    preferences : state.firebaseData.preferences,
    votes : state.votes,
    userId : state.userId,
    firebaseData : state.firebaseData
  }
}

var location = 'location';
var rating = 'rating';
var price = 'price';

class MatchesContainerComponent extends React.Component {

  constructor (){
    super();
    this.state = {
      //one of 'preferences'/'location'
      sort : rating
    }
    this.renderFilterButtons = this.renderFilterButtons.bind(this);
    this.renderSubmitButtonContainer = this.renderSubmitButtonContainer.bind(this);
  }

  renderFilterButtons() {

    return [location, rating, price].map(function(w){

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
       {w === this.state.sort ? <i className="fa fa-sort"/> : ''}
       &nbsp;{w}
     </button>)

    }, this);

  }

  renderSubmitButtonContainer () {
    if (this.props.votes.length) {
      return (
          <div className="select-button-container">
            <button className="btn btn-primary centered"
              onClick={this.props.submitVotesToFirebase}
            >
              <i className="fa fa-paper-plane-o"/>
              &nbsp;submit my picks
            </button>
          </div>
      )
    } else {
      return ''
    }
  }

  render() {

    var recordsToShow = _.sortBy(this.props.matches, function(m){
      if (this.state.sort === location){
        return m.time.origins[this.props.userId];
      } else if (this.state.sort === rating ){
        return -m.rating;
      } else if (this.state.sort === price){
        return m.price.trim().split('').length;
      }
    }, this);

    //convert from firebase form to array
    var userData = [];
    _.forEach(this.props.preferences, function(v,k){
      userData.push(_.extend(v, {userId : k}));
    });

    return  (
      <div className="matchescontainer-component">
        <div className="results-ranking">
        </div>
        <div className="results-container">
          <div className="results-container--left-child">
            <div
              className="btn-group btn-group--equal-width btn-group--single-row"
              role="group"
              style={{marginBottom: '1rem'}}
            >
              {this.renderFilterButtons()}
            </div>
            <ResultsList
              data={recordsToShow}
              userData={userData}
              updateVote={this.props.updateVote}
              votes={this.props.votes}
              userDict={this.props.firebaseData.nameDict}
              userId={this.props.userId}
            />
          </div>
          <div>
            <ResultsMap
              data={recordsToShow.slice(0,9)}
              userData={userData}
              votes={this.props.votes}
              userDict={this.props.firebaseData.nameDict}
            />
          </div>
        </div>
        { this.renderSubmitButtonContainer() }
      </div>
    );
  }
}


export default connect(
  mapStateToProps,
  {
    updateVote : updateVote,
    submitVotesToFirebase : submitVotesToFirebase
  }
)(MatchesContainerComponent);
