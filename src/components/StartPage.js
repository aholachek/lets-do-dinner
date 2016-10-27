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
      loading : false,
      hours : 2
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
      onClick={()=>{this.setState({loading : true});
      this.props.createInvitation(this.state.hours)}
      }
      className="btn btn-primary btn-block"
      style={{marginTop: '1rem', display: 'inline-block'}}>
      <i className="fa fa-envelope"/>&nbsp;
      Create invitation
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
          Invite your friends to help pick a restaurant or bar.
        </p>
        <form className="start-form centered-component">
          <h2>Let's Do {this.props.meal}</h2>
          <div className="btn-group meal-type" role="group">
            { this.renderMealType() }
          </div>
          <div>
            <label>
              We need to decide on a place<br/> within&nbsp;&nbsp;<input
                type="number"
                value={this.state.hours}
                style={{width: '3.5rem'}}
                max="48"
                min="1"
                onChange={(e)=>{
                  this.setState({hours: parseInt(e.target.value)});
                }}/>&nbsp;&nbsp;{this.state.hours === 1 ? 'hour.' : 'hours.'}
            </label>
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
