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
          <hr/>
          <p>
            <i className="fa fa-exclamation-circle"/>
            &nbsp;
            As the creator of this invitation, <b>you choose when to move it to the next stage.</b>&nbsp;
            Once you move to the voting stage, <b>no one else will be able to enter preferences.</b>
          </p>
          <p>Otherwise, check back later to see who has responded.</p>
            <br/> {this.renderSubmitButton()}
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
        <button className="btn btn-block btn-primary">
          <i className="fa fa-refresh fa-spin"/>&nbsp; Working...
        </button>
      )
    } else {
      let cl = 'btn btn-block btn-primary';
      return (
        <button className={cl} onClick={() => {
          this.setState({loading: true});
          this.props.moveToNextStage();
        }}>
          <i className="fa fa-arrow-circle-o-right fa-lg"/>&nbsp;
          Move to voting stage
        </button>
      )
    }
  }

  render() {
    return (
      <div className='centered-component' style={{
        marginTop: '2rem'
      }}>
        <h2>Waiting for responses...</h2>
        {this.renderAdminMessage()}
      </div>
    );
  }
}

WaitingPage.propTypes = {};
