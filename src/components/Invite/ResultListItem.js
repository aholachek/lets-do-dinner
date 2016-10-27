import React, {PropTypes} from 'react';
import RatingComponent from './RatingComponent';


let iconDict = {
  transit: 'fa fa-fw fa-subway',
  driving: 'fa fa-fw fa-car',
  bicycling: 'fa fa-fw fa-bicycle',
  walking: 'fa fa-fw fa-male'
};

export default class ResultListItem extends React.Component {
  constructor(props) {
    super(props);
    this.renderDirections = this.renderDirections.bind(this);
    this.renderVotingButtons = this.renderVotingButtons.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
  }

  //only show directions for current user
  renderDirections() {
      //preferences and location
      let d = this.props.userData;
      let mode = d.locations.from.mode;
      let modeLetter;

      if (['walking', 'bicycling', 'driving'].indexOf(mode) > -1) {
        modeLetter = mode[0];
      } else if (mode === 'transit') modeLetter = 'r';

      let from = d.locations.from.latitude + ',' + d.locations.from.longitude;
      let to = this.props.data.coordinates.latitude + ',' + this.props.data.coordinates.longitude;
      let googleURL = `http://maps.google.com?saddr=${from}&daddr=${to}&dirflg=${modeLetter}`;

      return <div>
        <b><i className={iconDict[mode]}/>&nbsp;{Math.ceil(this.props.time / 60)}&nbsp;minutes
        </b><br/>
        <a href={googleURL} target="_blank">
          (directions)
        </a>
        </div>
        }

  renderVotingButtons() {

    const updateVote = this.props.updateVote.bind(this, this.props.data.id);
    //it's not selected
    if (this.props.collapsed) {
      return (
        <button className="btn btn-sm btn btn-secondary btn-block" onClick={updateVote}>
          <i className="fa fa-square-o"/>&nbsp; I'm Not Interested
        </button>
      )
    } else {
      return (
        <button className="btn btn-sm btn-primary btn-block" onClick={updateVote}>
          <i className="fa fa-check-square-o"/>&nbsp; I'd Go Here
        </button>
      )
    }
  }

  renderVotes(){
    return (
      <div className="result-votes">
        <div><b>Voted yes:&nbsp;</b></div>
        <div>
          {this.props.submittedVotes.map(function(v,i){
            if (i === this.props.submittedVotes.length -1) {
              return <span>{v}</span>
            } else {
              return <span>{v},</span>
            }
          }, this)}
        </div>
      </div>)
  }

  renderTitle(){
    let indexNum = (this.props.index !== undefined) && this.props.index + 1;
    if (indexNum !== false){
      return <span> {indexNum}.&nbsp;{this.props.data.name} </span>
    } else {
      return this.props.data.name
    }
  }

  render() {
    if (this.props.collapsed) {
      return (
        <li className='clearfix card result-card'>
          <div className="result-card__content">
            <b>
              <a href={this.props.data.url} target="_blank">
                {this.props.index + 1}.&nbsp; {this.props.data.name}
              </a>
            </b>
          </div>
          {this.props.updateVote && this.renderVotingButtons()}
        </li>
      );
    }

    let cl ='clearfix card result-card result-card--active';
    if (this.props.winner) cl+= ' result-winner';

    return (
      <li className={cl}>
        <div style={{
          display: 'flex'
        }} className="result-card__content">
          <div className="result-card__img">
            {this.props.data.image_url
              ? <img src={this.props.data.image_url.replace('/o.jpg', '/90s.jpg')} alt="an image for this establishment" className="img-rounded"/>
              : ''
            }
          </div>
          <div style={{
            width: '100%'
          }}>
            <div className="result-title">
              <a href={this.props.data.url} target="_blank" >
                { this.renderTitle()}&nbsp;<i className="fa fa-yelp"/>
              </a>
              <div className="result-directions">{this.renderDirections()}</div>
            </div>
            <div className="winner-img">
              {this.props.data.image_url
                ? <img src={this.props.data.image_url.replace('/o.jpg', '/90s.jpg')} alt="an image for this establishment" className="img-rounded"/>
                : ''
              }
            </div>
            <RatingComponent rating={this.props.data.rating}/>
            <div className="result-price">{this.props.data.price}</div>
            <div>
              <span className="text-lighter">{this.props.data.categories.map(function(c, i) {
                if (i === this.props.data.categories.length - 1) {
                  return (
                    <span>{c.title}</span>
                  )
                } else {
                  return (
                    <span>{c.title},&nbsp;</span>
                  )
                }
              }, this)
              } </span>
            </div>
          </div>
        </div>
        {this.props.updateVote && this.renderVotingButtons()}
        {this.props.shouldRenderVotes && this.renderVotes()}
      </li>
    )
  }
}

ResultListItem.propTypes = {};
