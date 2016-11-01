'use strict';

import React from 'react'

import NameForm from './NameForm'
import PreferencesPanel from './PanelComponent'
import WaitingPage from './WaitingPage'
import ResultsContainer from './ResultsContainer'
import LeaderBoard from './LeaderBoard'

import {connect} from 'react-redux'

import {
  updatePreferences,
  submitNameToFirebase,
  submitPreferencesToFirebase,
  setNotifications,
  moveToNextStage
   } from 'actions/index'

function mapStateToProps(state) {
  return {
    preferences: state.preferences,
    meal: state.meal,
    firebaseData: state.firebaseData,
    userId: state.userId,
    notificationsOn: state.notificationsOn,
    isAdmin: state.firebaseData.admin === state.userId
  }
}

class InviteScreenManager extends React.Component {

  renderLoading() {
    return (
      <div className="centered-component centered-text" style={{marginTop: '5rem'}}>
        <h2><i className="fa fa-refresh fa-spin text-primary"/>
        &nbsp;Loading...</h2>
      </div>
    )
  }

  render() {
    const hasName = this.props.firebaseData.nameDict && this.props.firebaseData.nameDict[this.props.userId];

    if (!hasName) {
      return <NameForm
        submitNameToFirebase={this.props.submitNameToFirebase}
        name={this.props.firebaseData.nameDict
          ? this.props.firebaseData.nameDict[this.props.userId]
        : ''}
        meal={this.props.meal.toLowerCase()}
        isAdmin={this.props.isAdmin}/>

    }

    //preferences,voting
    switch (this.props.stage) {
      case 'preferences':
        const submittedPreferences = _.keys(this.props.firebaseData.preferences).indexOf(this.props.userId) > -1;

         if (submittedPreferences) {
          return <WaitingPage
            message="You will receive a notification when it's time to vote."
            admin={this.props.isAdmin}
            moveToNextStage={this.props.moveToNextStage}
            stage={this.props.stage}/>

        } else {
          return <PreferencesPanel
            data={this.props.preferences}
            meal={this.props.meal}
            updatePreferences={this.props.updatePreferences}
            submitPreferencesToFirebase={this.props.submitPreferencesToFirebase}
            notificationsOn={this.props.notificationsOn}
            setNotifications={this.props.setNotifications}/>
        }

      case 'voting':
         if (!this.props.firebaseData.matches) {
          return this.renderLoading();
        } else {
          //user has to vote
          return <ResultsContainer/>
        }
     case 'done':
      return <LeaderBoard/>
      default:
        return this.renderLoading()
    }
  }
}

InviteScreenManager.propTypes = {
  preferences: React.PropTypes.object.isRequired,
  meal: React.PropTypes.string.isRequired,
  firebaseData: React.PropTypes.object.isRequired,
  userId: React.PropTypes.string.isRequired,
  notificationsOn: React.PropTypes.bool.isRequired,
  isAdmin: React.PropTypes.bool.isRequired,
  submitNameToFirebase: React.PropTypes.func.isRequired,
  updatePreferences: React.PropTypes.func.isRequired,
  submitPreferencesToFirebase: React.PropTypes.func.isRequired,
  setNotifications: React.PropTypes.func.isRequired,
  moveToNextStage: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  submitNameToFirebase: submitNameToFirebase,
  updatePreferences: updatePreferences,
  submitPreferencesToFirebase: submitPreferencesToFirebase,
  setNotifications: setNotifications,
  moveToNextStage: moveToNextStage
})(InviteScreenManager);
