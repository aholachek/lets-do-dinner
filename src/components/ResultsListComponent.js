'use strict';

import React from 'react';
import RatingComponent from 'components/RatingComponent';
import _ from 'lodash';

let iconDict = {
  transit: 'fa fa-fw fa-subway',
  driving: 'fa fa-fw fa-car',
  bicycling: 'fa fa-fw fa-bicycle',
  walking: 'fa fa-fw fa-male'
};

class ResultsListComponent extends React.Component {

  constructor(){
    super();
    this.renderDirections = this.renderDirections.bind(this);
  }

  renderDirections(l){
    var origins = _.sortBy(_.pairs(l.time.origins), function(p){return p[0]});
    return _.map(origins, function(p){
      var k = p[0];
      var v = p[1];
      let d =  _.findWhere(this.props.userData, { userId : k});
      let mode = d.locations.from.mode;

      let modeLetter;
      if (['walking', 'bicycling', 'driving'].indexOf(mode) > -1){
        modeLetter = mode[0];
      } else if (mode ==='transit') modeLetter = 'r';

      let from =  d.locations.from.latitude + ',' + d.locations.from.longitude;
      let to  = l.coordinates.latitude + ',' + l.coordinates.longitude;
      let googleURL = `http://maps.google.com?saddr=${from}&daddr=${to}&dirflg=${modeLetter}`;

        return <div>
          {k}:&nbsp;&nbsp;
          <a href={ googleURL } target="_blank">
            <i className={iconDict[mode]} />
            &nbsp;&nbsp;
            {Math.ceil(v/60)}&nbsp;min
           </a>
        </div>
       }, this)

  }

  renderListItem(l, i) {
    return (
      <li className="clearfix">
        <div style={{display: 'flex'}}>
          <div style={{marginRight: '1rem', width: '90px', height: '90px'}}>
            { l.image_url ?
              <img src={l.image_url.replace('/o.jpg', '/90s.jpg')}
                alt="an image for this establishment"
                className="img-rounded"
                /> : ''
            }
          </div>
          <div style={{width: '100%'}}>
            <b> <a href={l.url} target="_blank">{i + 1}.&nbsp;{l.name}</a> </b>
              <div className="pull-right">{l.price}&nbsp;&nbsp;<RatingComponent rating = {l.rating}/></div>
          <div>
            <div><b>{
                l.categories.map(function(c, i) {
                  if (i === l.categories.length -1) {
                    return (<span>{c.title}</span>)
                  } else {
                    return (<span>{c.title},&nbsp;</span>)
                  }
              })
            }</b>
            </div>
            {this.renderDirections(l)}
          </div>
        </div>
        </div>
      </li>
    )
  }

  render() {
    if (!this.props.data) {
      return (<p>Submit 2 or more user preference profiles to see recommendations</p>)
    } else {

      return (
        <div>
          <ol className="resultslist-component">
            {
              this.props.data.map(function(l, i) {
              return this.renderListItem(l, i)
            }, this)
          }
          </ol>
        </div>
      );
    }
  }
}

// Uncomment properties you need
// ResultsListComponent.propTypes = {};
// ResultsListComponent.defaultProps = {};

export default ResultsListComponent;
