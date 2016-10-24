import React, {PropTypes} from 'react';

export default class WaitingPage extends React.Component {

  constructor() {
    super();
    this.renderAdminMessage = this.renderAdminMessage.bind(this);
    this.state = {
      loading: false,
      //make user check a box to move to next stage
      adminChecked: false
    }
  }

  renderAdminMessage() {
    if (this.props.admin) {
      return (
        <div style={{
          margin: '2rem 0 1rem 0'
        }}>
          <hr/>
          <p>
            <i className="fa fa-exclamation-circle"/>
            &nbsp;
            <b>
              As the creator of this invitation, you choose when to move it to the next stage.
            </b>
          </p>
          <p>
            {this.props.stage === 'preferences'
              ? 'Once you move to the voting stage, no one else will be able to enter in their preferences.'
              : 'Once you complete the voting stage, no one else will be able to enter in their vote.'
            }
          </p>

          <div className="form-check">
            <label className="form-check-label">
              <input type="checkbox"
                className="form-check-input"
                value="option1"
                checked={this.state.adminChecked}
                onChange={() => {
                  this.setState({
                    adminChecked: !this.state.adminChecked
                  })
              }}/>
              I've checked the top of this page to see who has responded and I'm ready to move the invitation to the next stage.
            </label>
          </div>

          <br/> {this.renderSubmitButton()}
        </div>
      )
    } else {
      return <div>Please check back soon!</div>
    }
  }

  renderSubmitButton() {
    if (this.state.loading) {
      return (
        <button className="btn btn-block btn-primary">
          <i className="fa fa-refresh fa-spin"/>&nbsp; Working...
        </button>
      )
    } else {
      let cl = 'btn btn-block btn-primary';
      if (!this.state.adminChecked) cl += ' disabled'
      return (
        <button className={cl} onClick={() => {
          if (!this.state.adminChecked) return;
          this.setState({loading: true});
          this.props.moveToNextStage();
        }}>
          <i className="fa fa-arrow-circle-o-right fa-lg"/>&nbsp;
          {this.props.stage === 'preferences'
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
        marginTop: '2rem'
      }}>
        <h2>Waiting...</h2>
        <hr/> {this.props.message}
        {this.renderAdminMessage()}
      </div>
    );
  }
}

WaitingPage.propTypes = {};
