'use strict';

import React from 'react';
import _ from 'lodash';

import { Link } from 'react-router'

import { connect } from 'react-redux'
import { subscribeToFirebase } from 'actions/index'

function mapStateToProps(state){
  return {
    meal : state.meal,
    visibleUsers : state.visibleUsers
  }

}


class InviteContainer extends React.Component {

  componentDidMount (){
    this.props.subscribeToFirebase(this.props.params.splat);
  }

  render() {

    return (
      <div className="invite-container">
        invitation whooo
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
