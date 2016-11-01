'use strict';

import React from 'react';
import _ from 'lodash';
import Progress from './Progress'
import InviteScreenManager from './InviteScreenManager'
import Sidebar from './Sidebar'

import { connect } from 'react-redux'
import { subscribeToFirebase } from 'actions/index'

function mapStateToProps(state){
  return {
    stage : state.firebaseData.stage,
    firebaseData : state.firebaseData,
    userId : state.userId
  }
}

class InviteContainer extends React.Component {

  componentDidMount (){
    //the url tells firebase which invitation this is
    this.props.subscribeToFirebase(this.props.params.splat);
  }

  render() {
    let stage = this.props.stage;
    const submittedVotes = this.props.firebaseData.submittedVotes;
    //user has submitted votes
    if (_.flatten(_.values(submittedVotes)).indexOf(this.props.userId) > -1) {
      stage = 'done';
    }

    return (
      <div className="invite-container">
        <Sidebar/>
        <main>
          {(stage === 'preferences' || stage ==='voting') &&
            <Progress
              stage={stage}
              firebaseData={this.props.firebaseData}
            />
          }
          <InviteScreenManager stage={stage}/>
        </main>
      </div>
    );
  }
}


InviteContainer.propTypes = {
  firebaseData : React.PropTypes.object.isRequired,
  userId : React.PropTypes.string.isRequired,
  subscribeToFirebase : React.PropTypes.func.isRequired,
  params : React.PropTypes.object.isRequired,
  stage : React.PropTypes.string
};

export default connect(
  mapStateToProps,
  {
    subscribeToFirebase : subscribeToFirebase
  }
)(InviteContainer);
