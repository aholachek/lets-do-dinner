import React, {PropTypes} from 'react';

export default class WaitingPage extends React.Component {

  render() {
    return (<div className='centered-text-container'>
      <div>
        <i className="fa fa-refresh fa-spin fa-3x text-primary"></i>
        <span className="sr-only">Loading...</span>
      </div>
      <div style={{margin: '1rem 0'}}>
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
