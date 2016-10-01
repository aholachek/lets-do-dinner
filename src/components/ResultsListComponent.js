'use strict';

import React from 'react';
import RatingComponent from 'components/RatingComponent';
import _ from 'lodash';

var iconDict = {
  transit: 'fa fa-fw fa-subway',
  driving: 'fa fa-fw fa-car',
  bicycling: 'fa fa-fw fa-bicycle',
  walking: 'fa fa-fw fa-male'
};

class ResultsListComponent extends React.Component {

  renderListItem(l, i) {
    return (
      <li className="clearfix">
        <div>
          <div className="pull-left" style={{marginRight: '1rem', width: '90px', height: '90px'}}>
            { l.image_url ?
              <img src={l.image_url.replace('/o.jpg', '/90s.jpg')}
                alt="an image for this establishment"
                className="img-rounded"
                /> : ''
            }
          </div>
          <b>
            <a href={l.url} target="_blank">{i + 1}.&nbsp;{l.name}</a>
          </b>
        </div>
        <div>
          {l.price}&nbsp;&nbsp;<RatingComponent rating = {l.rating}/>
        </div>
        <div>
          {_.map(l.time.origins, function(v,k){
            var mode = _.findWhere(this.props.userData, { userId : k}).locations.from.mode;
              return <div>
                {k}:&nbsp;&nbsp;
                <i className={iconDict[mode]} />
                &nbsp;&nbsp;
                {Math.ceil(v/60)} minutes
              </div>
             }, this)
           }
        </div>
        <div>{
            l.categories.map(function(c, i) {
              if (i === l.categories.length -1) {
                return (<span>{c.title}</span>)
              } else {
                return (<span>{c.title},&nbsp;</span>)
              }
          })
        }
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
