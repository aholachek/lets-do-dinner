require('styles/App.scss');
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import React from 'react'

import AppContainer from './AppContainerComponent'
import StartPage from './StartPage'
import ErrorPage from './ErrorPage'

import InviteUrl from './InviteUrl'

import InviteScreenManager from './Invite/InviteScreenManager'
import InviteContainer from './Invite/InviteContainer'


class AppComponent extends React.Component {

  render() {
    return (
      <Router history={hashHistory} onChange={this.onRouteChange}>
        <Route path="/" component={AppContainer}>
          <IndexRoute component={StartPage}/>
          <Route path='/get-invite-url/**' component={InviteUrl}/>
        </Route>
        <Route path='/invite/**' component={InviteContainer}/>
        <Route path='/error' component={ErrorPage}/>
      </Router>
    )
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
