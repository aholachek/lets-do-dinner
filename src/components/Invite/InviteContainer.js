'use strict';

import React from 'react';
import _ from 'lodash';
import Progress from './Progress'

import { Link } from 'react-router'

import { connect } from 'react-redux'
import { subscribeToFirebase } from 'actions/index'

function mapStateToProps(state){
  return {
    meal : state.meal,
    visibleUsers : state.visibleUsers,
    stage : state.firebaseData.stage,
    firebaseData : state.firebaseData
  }
}

class InviteContainer extends React.Component {

  componentDidMount (){
    //the url tells firebase which invitation this is
    this.props.subscribeToFirebase(this.props.params.splat);
  }

  render() {
    return (
      <div className="invite-container">
        <Progress
        userDict={this.props.firebaseData.nameDict}
        stage={this.props.stage}
        firebaseData={this.props.firebaseData}
        />
          {this.props.children}
      </div>
    );
  }
}


// Uncomment properties you need
// InviteContainer.propTypes = {};
// InviteContainer.defaultProps = {};

export default connect(
  mapStateToProps,
  {
    subscribeToFirebase : subscribeToFirebase
  }
)(InviteContainer);
