require('styles/App.scss');
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import React from 'react'

import AppContainer from './AppContainerComponent'
import StartPage from './StartPage'
import ErrorPage from './ErrorPage'

import InviteUrl from './InviteUrl'

import InviteScreenManager from './Invite/InviteScreenManager'
import InviteContainer from './Invite/InviteContainer'

hashHistory.listen(location => {
  if (location.pathname === '/') {
    document.body.classList.add('landing-page-background');
  } else {
    document.body.classList.remove('landing-page-background');
  }
});

class AppComponent extends React.Component {

  render() {
    return (
      <Router history={hashHistory} onChange={this.onRouteChange}>
        <Route path='/' component={StartPage}/>
        <Route path='/get-invite-url/**' component={InviteUrl}/>
        <Route path='/invite/**' component={InviteContainer}/>
        <Route path='/error' component={ErrorPage}/>
      </Router>
    )
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
