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
    const p = this.props;
    if (p.stage === 'preferences') {

      return (<div className='user-progress-container'>
        { _.keys(p.userDict).map(function(key){
        const submitted = _.keys(p.firebaseData.preferences).indexOf(key) > -1;
        let icon = submitted ? <i className="fa fa-check fa-fw"/>:
        <i className="fa fa-refresh fa-spin fa-fw"/> ;
        return <div className={submitted ? '' : 'text-muted'}>
        {p.userDict[key]}:{icon}
        </div>
      }, this) } </div>)

    } else if (p.stage === 'voting') {

      const submittedVotes = p.firebaseData.submittedVotes;

      return (<div className='user-progress-container'>
        { _.keys(this.props.userDict).map(function(key){
        const submitted = _.flatten(_.values(submittedVotes)).indexOf(key) > -1;
        let icon = submitted ? <i className="fa fa-check fa-fw"/>:
        <i className="fa fa-refresh fa-spin fa-fw"/> ;
        return <div className={submitted ? '' : 'text-muted'}>
        {this.props.userDict[key]}:{icon}
        </div>
      }, this)
    }</div>)
  }
}

  renderStages (){
    const stage = this.props.stage;
    return _.keys(stageDict).map(function(k, i){
      var cl = 'stage';
      if (k === stage) cl+= ' stage--active'
      return (
        <div className={cl}>
        <h2>{i+1}.&nbsp;{stageDict[k]}</h2>
        { (k === stage) ? this.renderOtherUsers() : <div></div> }
        </div>
      )
    }, this);
  }

  render() {
    return (
      <div>
        <div className="stage-container">{this.renderStages()}</div>
      </div>
    );
  }
}

Progress.propTypes = {
};
