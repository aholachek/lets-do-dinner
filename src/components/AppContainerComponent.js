'use strict';

import React from 'react';
import {connect} from 'react-redux'

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


export default connect(mapStateToProps)(ContainerComponent);
