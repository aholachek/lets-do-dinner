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
    return (<form onSubmit={this.setName} className="form-inline">
      <div className="input-group">
      <label>
      Enter your name: <br/>
      <input type="text"
      minLength="1"
      required
      ref={(i)=>this.input = i}
      className='form-control'
      />
      </label>
      <span className="input-group-button">
      <button className="btn btn-primary">submit</button>
      </span>
      </div>


    </form>);
  }
}

NameForm.propTypes = {
};
