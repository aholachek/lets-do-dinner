'use strict';

import React from 'react';
import RatingComponent from './RatingComponent';
import _ from 'lodash';
import FlipMove from 'react-flip-move';

let iconDict = {
  transit: 'fa fa-fw fa-subway',
  driving: 'fa fa-fw fa-car',
  bicycling: 'fa fa-fw fa-bicycle',
  walking: 'fa fa-fw fa-male'
};

class ResultsListComponent extends React.Component {

  constructor() {
    super();
    this.renderDirections = this.renderDirections.bind(this);
    this.renderVotingButtons = this.renderVotingButtons.bind(this);
  }

  //only show directions for current user
  renderDirections(l) {
    let userId = this.props.userId;
    let origins = _.sortBy(_.pairs(l.time.origins), function(p) {
      return p[0]
    });
    origins = origins.filter((p) => {
      return p[0] === userId
    }, this);
    return _.map(origins, function(p) {
      var k = p[0];
      var v = p[1];
      let d = _.findWhere(this.props.userData, {userId: k});
      let mode = d.locations.from.mode;

      let modeLetter;
      if (['walking', 'bicycling', 'driving'].indexOf(mode) > -1) {
        modeLetter = mode[0];
      } else if (mode === 'transit')
        modeLetter = 'r';

      let from = d.locations.from.latitude + ',' + d.locations.from.longitude;
      let to = l.coordinates.latitude + ',' + l.coordinates.longitude;
      let googleURL = `http://maps.google.com?saddr=${from}&daddr=${to}&dirflg=${modeLetter}`;

      return <div>
        <a href={googleURL} target="_blank">
          <i className={iconDict[mode]}/>
          &nbsp;&nbsp; {Math.ceil(v / 60)}&nbsp;minutes
        </a>
      </div>
    }, this);
  }

  renderListItem(l, i) {
    let cl = 'clearfix card result-card';
    if (this.props.votes.indexOf(l.id) > -1)
      cl += ' result-card--active'
    return (
      <li className={cl} key={l.id}>
        <div style={{
          display: 'flex'
        }} className="result-card__content">
          <div style={{
            marginRight: '1rem',
            width: '90px',
            height: '90px'
          }}>
            {l.image_url
              ? <img src={l.image_url.replace('/o.jpg', '/90s.jpg')} alt="an image for this establishment" className="img-rounded"/>
              : ''
            }
          </div>
          <div style={{
            width: '100%'
          }}>
            <b>
              <a href={l.url} target="_blank">
                {i + 1}.&nbsp; {l.name}
              </a>
            </b>
            <div className="pull-right lead">{l.price}</div>
            <div>
              <div><RatingComponent rating={l.rating}/></div>
              <div>
                <b>{l.categories.map(function(c, i) {
                  if (i === l.categories.length - 1) {
                    return (
                      <span>{c.title}</span>
                    )
                  } else {
                    return (
                      <span>{c.title},&nbsp;</span>
                    )
                  }
                })
                }</b>
              </div>
              {this.renderDirections(l)}
            </div>
          </div>
        </div>
        {this.renderVotingButtons(l)}
      </li>
    )
  }

  renderVotingButtons(l) {

    const updateVote = this.props.updateVote.bind(this, l.id);
    //it's not selected
    if (this.props.votes.indexOf(l.id) == -1) {
      return (
        <div className="result-card__voting-buttons">
          <button className="btn btn-sm btn btn-secondary-darker" onClick={updateVote}>
            <i className="fa fa-times"/>&nbsp;
            No Thanks
          </button>
          <button className="btn btn-sm btn-secondary" onClick={updateVote}>
            <i className="fa fa-check"/>&nbps;
            I'd Go Here
          </button>
        </div>
      )
    } else {
      return (
        <div className="result-card__voting-buttons">
          <button className="btn btn-sm btn-secondary" onClick={updateVote}>
            <i className="fa fa-times"/>&nbsp;
            No Thanks
          </button>
          <button className="btn btn-sm btn-primary" onClick={updateVote}>
            <i className="fa fa-check"/>&nbsp;
            I'd Go Here
          </button>
        </div>
      )
    }
  }

  render() {
    if (!this.props.data) {
      return (
        <p>Submit 2 or more user preference profiles to see recommendations</p>
      )
    } else {

      return (
        <div>
          <FlipMove typeName="ol" className="resultslist-component">
            {this.props.data.map(function(l, i) {
              return this.renderListItem(l, i)
            }, this)
}
          </FlipMove>
        </div>
      );
    }
  }
}

// Uncomment properties you need
// ResultsListComponent.propTypes = {};
// ResultsListComponent.defaultProps = {};

export default ResultsListComponent;
