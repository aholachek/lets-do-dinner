'use strict';

import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router'
import {connect} from 'react-redux'

function mapStateToProps(state) {
  return {
    meal: state.meal,
    admin: (state.firebaseData.admin === state.userId),
    inviteUrl: state.firebaseData.inviteUrl
  }
}

class ContainerComponent extends React.Component {

  constructor() {
    super();
    this.renderAdminLink = this.renderAdminLink.bind(this);
  }

  renderAdminLink() {
    return (
      <span className="admin-link">
        <b>Invite share link:</b>&nbsp;
         { this.props.inviteUrl }
      </span>
    )
  }

  render() {
    return (
      <div className="container-component">
        <div>
          <Link to="/" className="home-link">
            <h1>
              <i className={this.props.meal === 'Dinner'
                ? "fa fa-cutlery text-primary fa-2x fa-border"
                : "fa fa-glass text-primary fa-2x fa-border"}/>
            </h1>
          </Link>
        </div>
        <div className= 'content-container'> { this.props.children } </div>
        <footer className="footer" style={{textAlign : 'center'}}>
        <hr/>
        { this.props.admin  ? this.renderAdminLink() : '' }
        </footer>
      </div>
    );
  }
}

// Uncomment properties you need
// ContainerComponent.propTypes = {};
// ContainerComponent.defaultProps = {};

export default connect(mapStateToProps)(ContainerComponent);
