import React, {PropTypes} from 'react';

const stageDict = {
  'preferences' : 'Enter Preferences',
  'voting' : 'Vote on Suggestions',
  'done' : 'Find Out Result'
}

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.renderOtherUsers = this.renderOtherUsers.bind(this);
    this.renderStages = this.renderStages.bind(this);
  }

  renderOtherUsers(){
    _.values(this.props.userDict).forEach(function(n){
      return <div>{n}</div>
    });
  }

  renderStages (){
    return _.keys(stageDict).map(function(k){
      var cl = 'stage';
      if (k === this.props.stage) cl+= ' stage--active'
      return (
        <div className={cl}><h2>{stageDict[k]}</h2></div>
      )
    }, this);
  }

  render() {
    return (<div>
      <div className="stage-container">{this.renderStages()}</div>
      {this.renderOtherUsers()}
      <hr/>
      </div>);
  }
}

Progress.propTypes = {
};
