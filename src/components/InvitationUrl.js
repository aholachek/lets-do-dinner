'use strict';

import React from 'react';
import _ from 'lodash';

import { Link } from 'react-router'

import { connect } from 'react-redux'
import { updateMeal, updateVisible, reset,  createInvitation } from 'actions/index'

function mapStateToProps(state){
  return {
    inviteUrl : state.inviteUrl
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



class inviteURLPage extends React.Component {

  render() {

    debugger

    return (
      <div className="invite-url">
        {this.props.inviteUrl}
      </div>
    );
  }
}


// Uncomment properties you need
// inviteURLPage.propTypes = {};
// inviteURLPage.defaultProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(inviteURLPage);
