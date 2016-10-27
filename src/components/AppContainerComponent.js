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
  }

  render() {
    return (
      <div className="landing-page-background">
        {this.props.children}
      </div>
    );
  }
}

// Uncomment properties you need
// ContainerComponent.propTypes = {};
// ContainerComponent.defaultProps = {};

export default connect(mapStateToProps)(ContainerComponent);
