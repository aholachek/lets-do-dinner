'use strict';

import React from 'react';
import _ from 'lodash';

import { Link } from 'react-router'

import { connect } from 'react-redux'
import { updateMeal, updateVisible, reset,  createInvitation } from 'actions/index'

function mapStateToProps(state){
  return {
    meal : state.meal,
    visibleUsers : state.visibleUsers
  }

}

function mapDispatchToProps(dispatch){
  return {
    createInvitation(meal){
      dispatch(createInvitation(meal))
    },
    updateMeal: function(meal){
      dispatch(updateMeal(meal))
    }
  }
}



class InvitationStartPage extends React.Component {

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

  render() {

    return (
      <div className="start-page">
        <form className="start-form">
          <h2>Let's Do</h2>
          <div className="btn-group meal-type" role="group">
          { this.renderMealType() }
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
// InvitationStartPage.propTypes = {};
// InvitationStartPage.defaultProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitationStartPage);
