'use strict';

import React from 'react'

import NameForm from './NameForm'
import PreferencesPanel from './PanelComponent'
import WaitingPage from './WaitingPage'
import ResultsContainer from './ResultsContainer'
import FinalResult from './FinalResult'

import { connect } from 'react-redux'

import {
  updatePreferences,
  setName,
  submitPreferencesToFirebase,
  setNotifications
 } from 'actions/index'

function mapStateToProps(state){
  return {
    name : state.name,
    preferences : state.preferences,
    meal : state.meal,
    firebaseData : state.firebaseData,
    userId : state.userId,
    notificationsOn : state.notificationsOn
  }
}

class InviteScreenManager extends React.Component {

  render() {
    //preferences,voting,done
    switch (this.props.firebaseData.stage){
      case 'preferences':
        const submittedPreferences = _.keys(this.props.firebaseData.preferences).indexOf(this.props.userId) > -1;
        if (!this.props.name) {
          return <NameForm setName={this.props.setName}/>
        } else if (submittedPreferences){
            return <WaitingPage message="Currently waiting for other invitees to submit their preferences."/>
        }
        else {
          return <PreferencesPanel
          data={this.props.preferences}
          meal={this.props.meal}
          updatePreferences={this.props.updatePreferences}
          submitPreferencesToFirebase={this.props.submitPreferencesToFirebase}
          notificationsOn = {this.props.notificationsOn}
          setNotifications={this.props.setNotifications} />
        }
      case 'voting':
        const submittedVotes = this.props.firebaseData.submittedVotes;
        if (_.flatten(_.values(submittedVotes)).indexOf(this.props.userId) > -1) {
          return <WaitingPage message="Currently waiting for other invitees to submit their votes."/>
        } else {
          return <ResultsContainer/>
        }
      case 'done':
        return <FinalResult
        recommendation={this.props.firebaseData.finalRecommendation}
        matches = {this.props.firebaseData.matches}
        userId = {this.props.userId}
        preferences = {this.props.preferences}/>
      default:
        return <div>loading...</div>

    }
}
}

export default connect(
  mapStateToProps,
  {
    setName : setName,
    updatePreferences : updatePreferences,
    submitPreferencesToFirebase : submitPreferencesToFirebase,
    setNotifications : setNotifications
  }

)(InviteScreenManager);
