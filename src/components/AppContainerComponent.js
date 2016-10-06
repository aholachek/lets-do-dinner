'use strict';

import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { VelocityTransitionGroup } from 'velocity-react'
require('velocity-animate/velocity.ui');


function mapStateToProps(state){
  return {
    meal : state.meal
  }
}

class ContainerComponent extends React.Component {

  render() {
    //https://github.com/twitter-fabric/velocity-react/issues/29
    const { pathname } = this.props.location;
    const key = pathname.split('/')[1] || 'root';

    return (
      <VelocityTransitionGroup
       enter={{animation: 'transition.fadeIn', delay : '200', duration : '300'}}
       leave={{animation : 'transition.fadeOut', duration : '200'}}
        >
      <div className="container-component" key={key}>
        <div>
            <Link to="/" className="home-link">
            <h1>
              <i className={this.props.meal === 'Dinner' ?
                "fa fa-cutlery text-primary" :
                "fa fa-glass text-primary"
              }/>
              &nbsp;&nbsp;{'Let\'s Do ' + this.props.meal}
            </h1>
          </Link>
        </div>
         {this.props.children}
        <footer className="footer">
            <hr/>
            <span className="text-muted"> A work in progress by&nbsp;
              <a href="https://github.com/aholachek" target="_blank">Alex Holachek</a>
            .</span>
      </footer>
      </div>
    </VelocityTransitionGroup>
    );
  }
}

// Uncomment properties you need
// ContainerComponent.propTypes = {};
// ContainerComponent.defaultProps = {};

export default connect(
  mapStateToProps
)(ContainerComponent);
