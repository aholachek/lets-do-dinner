import React, {PropTypes} from 'react';
import RatingComponent from './RatingComponent';

let iconDict = {
  transit: 'fa fa-fw fa-subway',
  driving: 'fa fa-fw fa-car',
  bicycling: 'fa fa-fw fa-bicycle',
  walking: 'fa fa-fw fa-male'
};

export default class FinalResult extends React.Component {

  renderDirections(rec){
    debugger
    let userId = this.props.userId;
    let mode = this.props.preferences.mode;
    debugger
    let time = rec.time.origins[userId];
    let modeLetter;
    if (['walking', 'bicycling', 'driving'].indexOf(mode) > -1){
      modeLetter = mode[0];
    } else if (mode ==='transit') modeLetter = 'r';

    let from =  this.props.preferences.locations.from.latitude + ',' + this.props.preferences.locations.from.longitude;
    let to  = rec.coordinates.latitude + ',' + rec.coordinates.longitude;
    let googleURL = `http://maps.google.com?saddr=${from}&daddr=${to}&dirflg=${modeLetter}`;

    return (<div style={{marginTop: '2rem'}}>
      <div>
          <i className={iconDict[mode]} />
          {Math.ceil(time/60)}&nbsp;minute travel time
      </div>
      <a href={ googleURL } target="_blank">
        <i className="fa fa-google"></i> Get directions
       </a>
    </div>)

  }

  render() {

    if (!this.props.matches) return <div></div>

    var rec = this.props.matches.filter(function(m){
      return m.id === this.props.recommendation;
    }, this)[0];
    return (
      <div className='centered-component' style={{textAlign: 'center'}}>
        <div>
          <h2 style={{fontSize : '1.5rem', marginBottom: '1rem'}}>You're going to</h2>
        <div>
          <h3 style={{fontSize: '2rem'}}>
          <a href={rec.url}>{rec.name}</a>
          </h3>
        </div>
        <div style={{marginBottom: '2rem'}}>
          <b>{
              rec.categories.slice(0,2).map(function(c, i) {
                if (i === 1) {
                  return (<span>{c.title}</span>)
                } else {
                  return (<span>{c.title},&nbsp;</span>)
                }
            })
          }</b>
        </div>
        </div>
        <div>
          { rec.image_url ?
            <img src={rec.image_url.replace('/o.jpg', '/90s.jpg')}
              alt="an image for this establishment"
              className="img-rounded"
              /> : ''
          }
        </div>
        <div style={{marginTop : '2rem'}}>
          {rec.price}&nbsp;&nbsp;<RatingComponent rating = {rec.rating}/>
        </div>
        <div>
         <a href={rec.url}><i className="fa fa-yelp"/> Yelp Page</a>
        </div>
        <div>
        { this.renderDirections(rec) }
        </div>
      </div>
      );
  }
}

FinalResult.propTypes = {
};
