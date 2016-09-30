'use strict';

import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { reset } from 'actions/index'

function mapStateToProps(state){
  return {
    meal : state.meal
  }
}

function mapDispatchToProps(dispatch){
  return {
    resetAppData : function(){
      dispatch(reset());
    }
  }
}

class ContainerComponent extends React.Component {

  //take care of clearing out the state every time someone navigate to home
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname === '/' &&
        this.props.location.pathname !== '/'
   ){
      this.props.resetAppData();
    }
  }

  render() {
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
        {this.props.children}
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
  mapStateToProps,
  mapDispatchToProps
)(ContainerComponent);
