'use strict';

import React from 'react';
import _ from 'lodash';

import { Link } from 'react-router'

import { connect } from 'react-redux'
import { updateMeal, updateVisible } from 'actions/index'

function mapStateToProps(state){
  return {
    meal : state.meal,
    visibleUsers : state.visibleUsers
  }

}

function mapDispatchToProps(dispatch){
  return {
    updateMeal: function(meal){
      dispatch(updateMeal(meal))
    },
    updateVisible: function(n){
      dispatch(updateVisible(n))
    }
  }

}



class StartPage extends React.Component {

  constructor(){
    super();
    this.renderMealType = this.renderMealType.bind(this);
    this.onUsersChange = this.onUsersChange.bind(this);
    this.renderNumToInvite = this.renderNumToInvite.bind(this);
  }

  renderNumToInvite(){
    return _.range(1,5).map(function(n){

      var that = this;

       function onClick(){
         that.props.updateVisible(n + 1);
       }

       var word = n === 1 ? 'person' : 'people';


        if (n === this.props.visibleUsers - 1) {
          return <button type="button"
            className="btn btn-secondary-darker"
            key={n + '-btn'}
            onClick={onClick}
            ><b>{n}</b>&nbsp;{word}</button>
        } else {
          return <button type="button"
            className="btn btn-secondary"
             key={n + '-btn'}
             onClick={onClick}
             ><b>{n}</b>&nbsp;{word}</button>
        }
    }, this)
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
       that.props.updateMeal(w)
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

  onUsersChange(e) {
    this.props.updateVisible(e.target.value)
  }

  render() {

    return (
      <div className="start-page">
        <form className="start-form">
          <h2>Let's Do</h2>
          <div className="btn-group" role="group" aria-label="Basic example">
          { this.renderMealType() }
          </div>
          <div>
            <h2>Let's Invite</h2>
            { this.renderNumToInvite() }
          </div>
          <Link to="/preferences" className="btn btn-primary btn-block">Let's do this </Link>
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
  mapDispatchToProps
)(StartPage);
