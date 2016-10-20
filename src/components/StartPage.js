'use strict';

import React from 'react';
import _ from 'lodash';

import { Link } from 'react-router'

import { connect } from 'react-redux'
import { updateMeal, createInvitation } from 'actions/index'

function mapStateToProps(state){
  return {
    meal : state.meal
  }
}

class StartPage extends React.Component {

  constructor(){
    super();
    this.renderMealType = this.renderMealType.bind(this);
    this.renderSubmitButton = this.renderSubmitButton.bind(this);
    this.state = {
      loading : false
    }
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
       that.props.updateMeal(w);
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

renderSubmitButton () {
  if (!this.state.loading) {
    return (<button
      type="button"
      onClick={()=>{this.setState({loading : true}); this.props.createInvitation()}}
      className="btn btn-primary btn-block"
      style={{marginTop: '1rem', display: 'inline-block'}}
      >Create invitation
    </button>)
  } else {
    return  (<button
        type="button"
        className="btn btn-primary btn-block"
        style={{marginTop: '1rem', display: 'inline-block'}}
        ><i className="fa fa-refresh fa-spin fa-fw"/> Creating Invitation...
      </button>)
  }
}

  render() {

    return (
      <div className="start-page">
      <p>
        Pick a place to meet with friends more quickly. <br/>
        Make it easy for everyone to have a say.
      </p>
        <form className="start-form centered-component">
          <h2>Let's Do {this.props.meal}</h2>
          <div className="btn-group meal-type" role="group">
          { this.renderMealType() }
          </div>
          { this.renderSubmitButton() }
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
    updateMeal : updateMeal
  }
)(StartPage);
