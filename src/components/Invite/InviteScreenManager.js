'use strict';

import React from 'react'

import NameForm from './NameForm'
import PreferencesPanel from './PanelComponent'
import WaitingPage from './WaitingPage'
import ResultsContainer from './ResultsContainer'
import FinalResult from './FinalResult'

import {connect} from 'react-redux'

import {updatePreferences, submitNameToFirebase, submitPreferencesToFirebase, setNotifications, moveToNextStage} from 'actions/index'

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
      <div className="centered-component centered-text-container">
        <h2><i className="fa fa-refresh fa-spin text-primary"/>
          &nbsp;Loading...</h2>
      </div>
    )
  }

  render() {
    //preferences,voting,done
    switch (this.props.firebaseData.stage) {
      case 'preferences':
        const submittedPreferences = _.keys(this.props.firebaseData.preferences).indexOf(this.props.userId) > -1;
        const hasName = this.props.firebaseData.nameDict && this.props.firebaseData.nameDict[this.props.userId];

        if (!hasName) {
          return <NameForm submitNameToFirebase={this.props.submitNameToFirebase} name={this.props.firebaseData.nameDict
            ? this.props.firebaseData.nameDict[this.props.userId]
            : ''} meal={this.props.meal.toLowerCase()}/>

        } else if (submittedPreferences) {
          return <WaitingPage message="Currently waiting for more invitees to submit their preferences."
          admin={this.props.isAdmin} moveToNextStage={this.props.moveToNextStage}
          stage={this.props.firebaseData.stage}/>

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
        const submittedVotes = this.props.firebaseData.submittedVotes;
        if (_.flatten(_.values(submittedVotes)).indexOf(this.props.userId) > -1) {
          return <WaitingPage message="Currently waiting for more invitees to submit their votes." admin={this.props.isAdmin} moveToNextStage={this.props.moveToNextStage} stage={this.props.firebaseData.stage}/>
        } else if (!this.props.firebaseData.matches) {
          return this.renderLoading();
        } else {
          return <ResultsContainer/>
        }

      case 'done':
        if (this.props.firebaseData.finalRecommendation) {
          return <FinalResult
          recommendation={this.props.firebaseData.finalRecommendation}
          matches={this.props.firebaseData.matches}
          userId={this.props.userId}
          preferences={this.props.preferences}/>
        } else {
          return <WaitingPage
          message="Tallying votes"
          admin={false}
          moveToNextStage={this.props.moveToNextStage}
          stage={this.props.firebaseData.stage}/>
        }
      default:
        return this.renderLoading()
    }
  }
}

export default connect(mapStateToProps, {
  submitNameToFirebase: submitNameToFirebase,
  updatePreferences: updatePreferences,
  submitPreferencesToFirebase: submitPreferencesToFirebase,
  setNotifications: setNotifications,
  moveToNextStage: moveToNextStage
})(InviteScreenManager);
