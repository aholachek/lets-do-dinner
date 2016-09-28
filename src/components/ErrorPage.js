
import React from 'react';
import _ from 'lodash';

import { Link } from 'react-router'

import { connect } from 'react-redux'
import { updateMeal, updateVisible } from 'actions/index'

function mapStateToProps(state){
  return {
    state : state.matches.resultState,
  }
}

class ErrorPage extends React.Component {

  render() {

    return (
      <div className="error-page">
        <div style={{margin:'3rem 0'}}>
          <h2><i className="fa fa-exclamation-circle"/> There was an error.</h2>
          <p>You can start over <Link to="/"> here</Link>.</p>
        </div>

      </div>
    );
  }
}


// Uncomment properties you need
// ErrorPage.propTypes = {};
// ErrorPage.defaultProps = {};

export default connect(
  mapStateToProps,
)(ErrorPage);
