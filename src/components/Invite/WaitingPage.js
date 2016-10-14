import React, {PropTypes} from 'react';

export default class WaitingPage extends React.Component {

  render() {
    return (<div>
      <div>
      <i className="fa fa-refresh fa-spin fa-2x"></i>
      <span className="sr-only">Loading...</span>
      </div>
      <div>
      {this.props.message}
      </div>
      <div>
      Please check back soon!
      </div>
      </div>);
  }
}

WaitingPage.propTypes = {
};
