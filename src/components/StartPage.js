'use strict';

import React from 'react';
import _ from 'lodash';

import { Link } from 'react-router'

import { connect } from 'react-redux'
import { updateMeal, updateNumGuests,  createInvitation } from 'actions/index'

function mapStateToProps(state){
  return {
    meal : state.meal,
    numGuests : state.numGuests
  }
}

class StartPage extends React.Component {

  constructor(){
    super();
    this.renderMealType = this.renderMealType.bind(this);
  }

  renderMealType(){
    var iconDict = {
      Dinner : 'fa fa-cutlery',
      Drinks : 'fa fa-glass',
      Brunch : 'fa fa-coffee'
    }

   return  [ 'Dinner', 'Drinks'].map(function(w){
     var that = this;

     function onClick(){
       that.setState({ meal : w});
     }

     var cn = (w === this.props.meal) ?
      "btn btn-secondary-darker" :
      "btn btn-secondary";

      return <button
        type="button"
        className={cn}
         key={w + '-btn'}
         onClick={onClick}
         >
         <i className={iconDict[w]}/>&nbsp;&nbsp;
         {w}
       </button>
    }, this);

  }

  renderNumToInvite(){
  return _.range(1,5).map(function(n){

    var that = this;

     function onClick(){
       that.props.updateNumGuests(n + 1);
     }

     var word = n > 1 ? 'people' : 'person';

      if (n === this.props.numGuests -1) {
        return <button type="button"
          className="btn btn-secondary-darker"
          key={n + '-btn'}
          onClick={onClick}
          ><b>{n}</b> {word}</button>
      } else {
        return <button type="button"
          className="btn btn-secondary"
           key={n + '-btn'}
           onClick={onClick}
           ><b>{n}</b> {word}</button>
      }
  }, this)
}

  render() {

    return (
      <div className="start-page">
        <form className="start-form">
          <h2>I'm planning</h2>
          <div className="btn-group meal-type" role="group">
          { this.renderMealType() }
          </div>
          <h2>I'm inviting</h2>
          <div className="btn-group num-to-invite" role="group">
          { this.renderNumToInvite() }
          </div>
            <button
              type="button"
              onClick={this.props.createInvitation}
              className="btn btn-primary btn-block"
              style={{marginTop: '1rem', display: 'inline-block'}}
              >Create invitation
            </button>
        </form>
      </div>
    );
  }
}


// Uncomment properties you need
// StartPage.propTypes = {};
// StartPage.defaultProps = {};

export default connect(
  mapStateToProps,
  {
    createInvitation : createInvitation,
    updateMeal : updateMeal,
    updateNumGuests : updateNumGuests
  }
)(StartPage);
