'use strict';

import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router'
import { connect } from 'react-redux'

function mapStateToProps(state){
  return {
    meal : state.meal
  }
}

class ContainerComponent extends React.Component {

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
