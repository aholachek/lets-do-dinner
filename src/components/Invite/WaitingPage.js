import React, {PropTypes} from 'react';

export default class WaitingPage extends React.Component {

  constructor() {
    super();
    this.renderAdminMessage = this.renderAdminMessage.bind(this);
    this.state = {
      loading: false
    }
  }

  renderAdminMessage() {
    if (this.props.admin) {
      return (
        <div style={{
          margin: '2rem 0 1rem 0'
        }}>

          <div className="card centered-text" style={{padding: '1rem'}}>
            <div>
              <b><i className="fa fa-warning"/>&nbsp;Admin Override</b>
            </div>
            <p>
              No one else will be able to enter preferences!
            </p>
            {this.renderSubmitButton()}
            <br/>

          </div>
          </div>
          )
    } else {
      return <div>
        <hr/>
        {this.props.message}
      </div>
    }
  }

  renderSubmitButton() {
    if (this.state.loading) {
      return (
        <button className="btn btn-primary btn-block">
          <i className="fa fa-refresh fa-spin"/>&nbsp; Working...
        </button>
      )
    } else {
      let cl = 'btn btn-primary btn-block';
      return (
        <button className={cl} onClick={() => {
          this.setState({loading: true});
          this.props.moveToNextStage();
        }}>
          Move to voting stage early
        </button>
      )
    }
  }

  render() {
    return (
      <div className='centered-component' style={{
        marginTop: '5rem'
      }}>
        <h2>Waiting for replies...</h2>
        <p style={{padding: '1rem 0'}}>
        Voting will start when the preference deadline is reached.</p>
        {this.renderAdminMessage()}
      </div>
    );
  }
}

WaitingPage.propTypes = {};
