'use strict';

import React from 'react';
import _ from 'lodash';

import { Link } from 'react-router'

import { connect } from 'react-redux'
import { updateMeal, updateVisible, reset,  createInvitation } from 'actions/index'

function mapStateToProps(state){
  return {
    inviteUrl : state.inviteUrl,
    numGuests : state.numGuests
  }
}

class inviteURLPage extends React.Component {

  render() {

   const relativeLink = this.props.inviteUrl.replace(document.location.origin +'#', '');

    return (
      <div className="invite-url centered-text-container">
        <div>
          First, send this link to { this.props.numGuests -1 } {this.props.numGuests > 2 ? 'friends' : 'friend'}:
          <div>
          <div style={{margin: '2rem 0'}}>
            <b>{this.props.inviteUrl}</b>
          </div>
          </div>
        </div>
        <div>
          Then <Link to={relativeLink}> enter your preferences to get started.</Link>
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
  {
    createInvitation : createInvitation,
    updateMeal : updateMeal
    }
)(inviteURLPage);
