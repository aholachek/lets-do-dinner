'use strict';

import React from 'react';
import _ from 'lodash';


class ContainerComponent extends React.Component {


  render() {
    return (
      <div className="container-component">
        <div><a href="/" className="home-link">
          <h1>
            <i className="fa fa-cutlery text-primary"/>&nbsp;&nbsp;Let's Do Dinner
          </h1>
        </a>
        </div>
        {this.props.children}
        <footer className="footer">
            <hr/>
            <span className="text-muted"> A work in progress by&nbsp;
              <a href="https://github.com/aholachek">Alex Holachek</a>
            .</span>
      </footer>
      </div>
    );
  }
}

ContainerComponent.displayName = 'ContainerComponent';

// Uncomment properties you need
// ContainerComponent.propTypes = {};
// ContainerComponent.defaultProps = {};

export default ContainerComponent;
