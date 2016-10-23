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
          <p>
            <i className="fa fa-exclamation-circle"/>
            &nbsp;
            <b>
              As the creator of this invitation, you choose when to move it to the next stage.
            </b>
          </p>
          <ol style={{
            padding: '0 0px 0 16px'
          }}>
            <li>Check who has responded at the top of this page.</li>
            <li>Once you're happy with the number of replies, press the button below.
            </li>
          </ol>
          <div>
            {this.renderSubmitButton()}
          </div>
        </div>
      )
    } else {
      return <div>Please check back soon!</div>
    }
  }

  renderSubmitButton() {
    if (this.state.loading){
      return (
        <button className="btn btn-block btn-primary">
          <i className="fa-refresh fa-spin"/>
          Working...
        </button>
      )
    } else {
      return (
        <button className="btn btn-block btn-primary" onClick={() => {
          this.setState({loading: true});
          this.props.moveToNextStage
        }}>
          <i className="fa fa-arrow-circle-o-right fa-lg"/>&nbsp;
          { this.props.stage === 'preferences'
            ? 'Move to voting stage'
            : 'End voting and calulate results'
          }
        </button>
      )
    }
  }

  render() {
    return (
      <div className='centered-component' style={{
        marginTop: '4rem'
      }}>
        <h2>Waiting...</h2>
        <hr/> {this.props.message}
        {this.renderAdminMessage()}
      </div>
    );
  }
}

WaitingPage.propTypes = {};
