import React from 'react';
import _ from 'lodash';

const stageDict = {
  preferences : 'Enter Preferences',
  voting : 'Vote on Suggestions'
}

const iconDict = {
  preferences : (<i className="fa fa-pencil-square-o"/>),
  voting : (<i className="fa fa-thumbs-o-up"/>)
}

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.renderStages = this.renderStages.bind(this);
  }

  renderStages (){
    let stage = this.props.stage;
    return _.keys(stageDict).map(function(k){
      var cl = 'stage';
      if (k === stage) cl+= ' stage--active'
      return (
        <div className={cl}>
          <h2>{iconDict[k]}&nbsp;&nbsp;{stageDict[k]}</h2>
        </div>
      )
    }, this);
  }

  render() {
    return   <div className="stage-container">{this.renderStages()}</div>
  }
}

Progress.propTypes = {
  stage : React.PropTypes.string.isRequired
};
