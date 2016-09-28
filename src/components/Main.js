
require('styles/App.scss');
import { Router, Route, IndexRoute, hashHistory } from 'react-router'


import React from 'react';

import AppContainer from './AppContainerComponent'
import StartPage from './StartPage'
import PreferencesContainer from './PreferencesContainerComponent'
import ResultsContainer from './ResultsContainerComponent'
import ErrorPage from './ErrorPage'

class AppComponent extends React.Component {

  render() {
    return (
            <Router history={hashHistory}>
              <Route path="/" component={AppContainer}>
                <IndexRoute component={StartPage}></IndexRoute>
                <Route path="/preferences" component={PreferencesContainer}/>
                <Route path="/results" component={ResultsContainer}/>
                <Route path="/error" component={ErrorPage}/>
              </Route>
            </Router>
        )
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
