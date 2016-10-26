'use strict';

import React from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'

function mapStateToProps(state) {
  return {
    meal: state.meal,
    admin: (state.firebaseData.admin === state.userId),
    inviteUrl: state.firebaseData.inviteUrl,
    stage : state.firebaseData.stage
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
        <b>Invite people by sending them this link:</b>&nbsp; {this.props.inviteUrl}
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
                ? 'fa fa-cutlery'
              : 'fa fa-glass'}/>
              &nbsp;&nbsp;
              <span className="hidden-xs-down">
                Let's Do {this.props.meal}
              </span>
            </h1>
          </Link>
        </div>
        <div className='content-container'>
          {this.props.children}
        </div>
        <footer className="footer" style={{
          textAlign: 'center'
        }}>
          <hr/> {this.props.admin && this.props.stage !== 'done'
            ? this.renderAdminLink()
          : ''}
        </footer>
      </div>
    );
  }
}

// Uncomment properties you need
// ContainerComponent.propTypes = {};
// ContainerComponent.defaultProps = {};

export default connect(mapStateToProps)(ContainerComponent);
