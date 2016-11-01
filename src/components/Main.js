require('styles/App.scss');
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import React from 'react'

import AppContainer from './AppContainerComponent'
import StartPage from './StartPage'
import InviteUrl from './InviteUrl'
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
      </Router>
    )
  }
}

export default AppComponent;
