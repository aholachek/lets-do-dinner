'use strict';

import React from 'react';
import RatingComponent from 'components/RatingComponent';

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
          total travel: <b>{ Math.ceil(l.time.total/60) } minutes</b>
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
