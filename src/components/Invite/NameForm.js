import React, {PropTypes} from 'react';

export default class NameForm extends React.Component {

  constructor(){
    super();
    this.setName = this.setName.bind(this);
  }

  setName(e){
    this.props.setName(this.input.value);
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.setName} className="centered-component">
      <div className="input-group">
      <label>
      <b>First, enter your name</b> (it will be visible to the other invitees)
        <input type="text"
        minLength="1"
        required
        ref={(i)=>this.input = i}
        className='form-control'
        style={{margin: '1rem 0'}}
        />
      </label>
      </div>
      <button className="btn btn-primary btn-block">submit</button>
    </form>
  );
  }
}

NameForm.propTypes = {
};
