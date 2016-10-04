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
    const element = this.props.children || <div/>;
    const elementToAnimate = React.cloneElement(element, { key });

    return (
      <div className="container-component">
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
        <VelocityTransitionGroup
         enter={{animation: 'transition.slideDownIn', delay : '100', duration : '300'}}
         leave={{animation : 'transition.slideDownOut', duration : '100'}}
          >
         {elementToAnimate}
       </VelocityTransitionGroup>
        <footer className="footer">
            <hr/>
            <span className="text-muted"> A work in progress by&nbsp;
              <a href="https://github.com/aholachek" target="_blank">Alex Holachek</a>
            .</span>
      </footer>
      </div>
    );
  }
}

// Uncomment properties you need
// ContainerComponent.propTypes = {};
// ContainerComponent.defaultProps = {};

export default connect(
  mapStateToProps
)(ContainerComponent);
