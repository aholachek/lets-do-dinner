'use strict';

import React from 'react';
import _ from 'lodash';

import { Link } from 'react-router'

import { connect } from 'react-redux'
import { updateMeal, updateVisible, reset } from 'actions/index'

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
    this.renderNumToInvite = this.renderNumToInvite.bind(this);
  }

  renderNumToInvite(){
    return _.range(2,6).map(function(n){

      var that = this;

       function onClick(){
         that.props.updateVisible(n);
       }

        if (n === this.props.visibleUsers) {
          return <button type="button"
            className="btn btn-secondary-darker"
            key={n + '-btn'}
            onClick={onClick}
            ><b>{n}</b></button>
        } else {
          return <button type="button"
            className="btn btn-secondary"
             key={n + '-btn'}
             onClick={onClick}
             ><b>{n}</b></button>
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

  render() {

    return (
      <div className="start-page">
        <form className="start-form">
          <h2>Let's Do</h2>
          <div className="btn-group meal-type" role="group">
          { this.renderMealType() }
          </div>
            <h2>For a Party of</h2>
            <div className="btn-group num-to-invite" role="group">
              { this.renderNumToInvite() }
            </div>
            <Link to="/preferences"
              className="btn btn-primary btn-block"
              style={{marginTop: '1rem', display: 'inline-block'}}
              >Let's do this
            </Link>
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
