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

   const relativeLink = this.props.inviteUrl.replace(document.location.origin +'#', '');

    return (
      <div className="invite-url">
        <div>
          First, send this link to up to 4 friends to get started:
          {this.props.inviteUrl}
        </div>
        <div>
          Then <Link to={relativeLink}>
          get started entering in your preferences
        </Link>
        </div>

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
