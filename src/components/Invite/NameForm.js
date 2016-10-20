import React, {PropTypes} from 'react';

export default class NameForm extends React.Component {

  constructor(){
    super();
    this.setName = this.setName.bind(this);
  }

  setName(e){
    this.props.submitNameToFirebase(this.input.value);
    e.preventDefault();
  }

  render() {
    return (
      <div className="centered-component" style={{marginTop: '5rem'}}>
        <p className="lead" style={{textAlign : 'center'}}>
        You're about to help decide on the best place to meet up for {this.props.meal} with friends.
        </p>
        <br/>
        <form onSubmit={this.setName}>
        <div className="input-group">
        <label>
        <b>First, enter your name</b> (it will be visible to the other invitees)
          <input type="text"
          minLength="1"
          required
          ref={(i)=>this.input = i}
          className='form-control'
          style={{margin: '1rem 0'}}
          defaultValue={this.props.name}
          />
        </label>
        </div>
        <button className="btn btn-primary btn-block">submit</button>
      </form>
    </div>
    );
  }
}

NameForm.propTypes = {
};
