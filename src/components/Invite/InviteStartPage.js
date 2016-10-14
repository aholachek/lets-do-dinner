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
    this.renderMessage = this.renderMessage.bind(this);
  }

  renderMessage (){

    if (this.props.name){
      return (
        <div>
          Welcome {this.props.name}!
          <Link to="/invite/preferences"></Link>
        </div>
      )
    }

  }

  render() {

    return (
      <div className="invite-start-page">
      { this.renderMessage() }
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
