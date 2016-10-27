import React, {PropTypes} from 'react';

import {connect} from 'react-redux';
import CountdownTimer from './CountdownWrapper';
import moment from 'moment'
import {Link} from 'react-router';

import CopyInviteLink from '../CopyInviteLink';

function mapStateToProps(state) {
  return {
    meal: state.meal,
    admin: (state.firebaseData.admin === state.userId),
    stage: state.firebaseData.stage,
    firebaseData : state.firebaseData
  }
}

class Sidebar extends React.Component {

  constructor() {
    super();
    this.renderAdminLink = this.renderAdminLink.bind(this);
    this.renderSidebarToggleButton = this.renderSidebarToggleButton.bind(this);
    //for small screens
    this.state = {
      sidebarOpen : false
    }
  }

  renderOtherUsers() {
    let nameDictKeys = _.keys(this.props.firebaseData.nameDict);
    if (nameDictKeys.length == 0){
      return (
        <div>
          <div className="sidebar-title">
            Invitees
          </div>
          <i>Waiting for responses...</i>
        </div>
      )
    }

    return (
      <div>
        <div className="sidebar-title">
          Invitees
        </div>
        <table className="table table-sm">
          <thead>
            <tr>
              <th></th>
              <th title="entered preferences">
                <i className="fa fa-lg fa-fw fa-pencil-square-o"></i>
              </th>
              <th title="voted">
                <i className="fa fa-lg fa-fw fa-thumbs-o-up"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {nameDictKeys.map(function(key) {
              let preferencesIcon;
              const submittedPreferences = _.keys(this.props.firebaseData.preferences).indexOf(key) > -1;
              if (submittedPreferences){
                preferencesIcon = <i className="fa fa-lg fa-check-square-o text-primary "/>
              } else if (this.props.stage ==='preferences'){
                preferencesIcon = <i className="fa fa-square-o fa-lg burst-animation"/>;
              } else {
                preferencesIcon = '';
              }

              let votingIcon;
              const submittedVotes = _.flatten(_.values(this.props.firebaseData.submittedVotes)).indexOf(key) > -1;
              if (submittedVotes){
                votingIcon = <i className="fa fa-check-square-o fa-lg text-primary"/>;
              } else if (this.props.stage === 'voting'){
                votingIcon = <i className="fa fa-square-o fa-lg burst-animation"/>
              } else {
                votingIcon = '';
              }
              
              return (
                <tr>
                  <td>{this.props.firebaseData.nameDict[key]}</td>
                  <td>{preferencesIcon}</td>
                  <td>{votingIcon}</td>
                </tr>
              )
            }, this)
            }
          </tbody>
        </table>

      </div>

    )
  }

  renderCountdownClock() {
    if (this.props.firebaseData.dueAt && this.props.stage === 'preferences') {
      let seconds = Math.floor((new Date(this.props.firebaseData.dueAt) - new Date()) / 1000);
      return <div className="countdown-container" key='countdown-clock'>
        <div className="sidebar-title">
        Preference deadline</div>
        &nbsp;&nbsp;
        <div>
          <CountdownTimer
            seconds={seconds}
            color='#3919bb'
            size={130}
            weight={5}
            showMilliseconds={false}
            font={'Open sans'}
            alpha={.8}/>
        </div>
      </div>
    } else {
      return ''
    }
  }

  renderAdminLink() {
    return (
      <div className="admin-link">
        <div className="sidebar-title">Invite Share Link</div>
        <CopyInviteLink inviteUrl={this.props.firebaseData.inviteUrl}/>
      </div>
    )
  }

  renderSidebarToggleButton(){
    return (
      <button
        className="btn btn-primary toggle-sidebar-btn"
        onClick={()=> this.setState({sidebarOpen : !this.state.sidebarOpen})}
      >
        {this.state.sidebarOpen ? 'Hide Invite Info' : 'Show Invite Info'}
      </button>
    )
  }

  render() {
    let sidebarContentCN = 'sidebar-content';
    //this only affects smaller screens
    if (this.state.sidebarOpen) sidebarContentCN += ' sidebar-content--open';
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <Link to="/" className="home-link">
            <h1>
              <i className={this.props.meal === 'Dinner'
                ? 'fa fa-cutlery'
              : 'fa fa-glass'}/>
              &nbsp;&nbsp; Let's Do {this.props.meal}
            </h1>
          </Link>
          {this.renderSidebarToggleButton()}
        </div>
        <div className={sidebarContentCN}>
          {this.renderOtherUsers()}
          {this.renderCountdownClock()}
          {this.props.admin && this.props.stage !== 'done'
            ? this.renderAdminLink()
          : ''}
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {};

export default connect(mapStateToProps)(Sidebar);
