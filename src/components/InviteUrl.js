'use strict';

import React from 'react';
import _ from 'lodash';

import {Link} from 'react-router'
import CopyInviteLink from './CopyInviteLink';

import {connect} from 'react-redux'
import {
  updateMeal,
  updateVisible,
  reset,
  createInvitation,
  setFirebaseData,
  setInviteId
} from 'actions/index'

function mapStateToProps(state) {
  return {
    inviteUrl: state.firebaseData.inviteUrl,
    inviteId: state.inviteid,
    meal: state.meal,
    dueAt : state.firebaseData.dueAt
    }
}

class inviteURLPage extends React.Component {

  componentDidMount() {
    if (!this.props.inviteUrl) {
      let inviteId = this.props.params.splat;
      this.props.setInviteId(inviteId);
    }
  }

  render() {

    const relativeLink = this.props.inviteUrl
      ? this.props.inviteUrl.split("#")[1]
      : '';

    let timeinMS;
    let hrs;
    let emailSubject;
    let emailBody;

    if (this.props.dueAt){
      timeinMS = new Date(this.props.dueAt) - new Date();
      hrs = timeinMS / (1000 * 60 * 60);
      mins = hrs
      emailSubject = encodeURIComponent(`Want to get together for ${this.props.meal.toLowerCase()}?`);
      emailBody = encodeURIComponent(`\nHey, I've created an invite on the app Let's Do Dinner to help us automate the process of finding a place to meet.
     \nPlease respond within ${Math.floor(hrs)} hours and ${Math.floor(hrs % 1 * 60)} minutes to make sure your preferences get taken into account!
     \nJust go here:\n\n${this.props.inviteUrl}\n\nand follow the instructions.
     \nSee you soon!`);
    }

    return (
      <div className="invite-url centered-component" style={{maxWidth : '400px'}}>

        <h2>Success!</h2>
        <hr/>

        <div style={{
          margin: '1rem 0'
        }}>
          <div className="circle-bg">1</div>
          <div>
            <div>
              Send this invite link to up to 4 other friends:
              <CopyInviteLink inviteUrl={this.props.inviteUrl}/>
            </div>
            {
              emailSubject ?  <div>
                <a                                                                                                     target="_blank"
                  href={`https://mail.google.com/mail/?view=cm&fs=1&su=${emailSubject}&body=${emailBody}`}>
                  <i className="fa fa-envelope"/>&nbsp; Open a pre-filled invitation in Gmail
                </a>
              </div> : ''
            }

          </div>
        </div>

        <div>
          <div className="circle-bg">2</div>
          <div style={{
            width: '100%'
          }}>
            <Link to={relativeLink} className="btn btn-primary btn-block">
              <i className="fa fa-lg fa-arrow-circle-o-right"/>&nbsp;Get started sharing my preferences</Link>
          </div>
        </div>

      </div>
    );
  }
}

// Uncomment properties you need
// inviteURLPage.propTypes = {};
// inviteURLPage.defaultProps = {};

export default connect(mapStateToProps, {
  createInvitation: createInvitation,
  updateMeal: updateMeal,
  setInviteId: setInviteId
})(inviteURLPage);
