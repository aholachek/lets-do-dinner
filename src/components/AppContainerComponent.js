'use strict';

import React from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'
import ReactCountdownClock from 'react-countdown-clock'
import moment from 'moment'
import CopyInviteLink from './CopyInviteLink';

function mapStateToProps(state) {
  return {
    meal: state.meal,
    admin: (state.firebaseData.admin === state.userId),
    inviteUrl: state.firebaseData.inviteUrl,
    stage : state.firebaseData.stage,
    dueAt : state.firebaseData.dueAt,
    createdAt : state.firebaseData.createdAt
  }
}

class ContainerComponent extends React.Component {

  constructor() {
    super();
    this.renderAdminLink = this.renderAdminLink.bind(this);
  }

  renderAdminLink() {
    return (
      <div className="admin-link">
        <div style={{fontWeight: 'bold'}}>Invite Share Link</div>
        <CopyInviteLink inviteUrl={this.props.inviteUrl}/>
      </div>
    )
  }

  renderCountdownClock () {
    if (this.props.dueAt){
      let seconds = (new Date(this.props.dueAt) - new Date())/1000;
      return <div className="countdown-container">
        <div style={{fontWeight: 'bold'}}>Time Left to Reply</div>
        &nbsp;&nbsp;
        <div>
          <ReactCountdownClock
            seconds={seconds}
            color='#3919bb'
            size={130}
            weight={5}
            showMilliseconds={false}
            font={'Open sans'}
          />
        </div>
      </div>
    } else {
      return ''
    }

  }

  render() {
    return (
      <div className="content-container">
        {this.props.children}
      </div>
    );
  }
}

// Uncomment properties you need
// ContainerComponent.propTypes = {};
// ContainerComponent.defaultProps = {};

export default connect(mapStateToProps)(ContainerComponent);
