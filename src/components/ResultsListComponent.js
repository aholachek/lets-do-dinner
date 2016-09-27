'use strict';

import React from 'react';
import RatingComponent from 'components/RatingComponent';

class ResultsListComponent extends React.Component {

  renderListItem(l, i) {
    return (
      <li>
        <div>
          <b>
            <a href={l.url} target="_blank">{l.name}</a>
          </b>
        </div>
        <div>
          {l.price}&nbsp;&nbsp;<RatingComponent rating = {l.rating}/>
        </div>
        <div>
          total travel minutes: { l.time.total }
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
        <ol className="resultslist-component">
          {
            this.props.data.map(function(l) {
            return this.renderListItem(l)
          }, this)
        }
        </ol>
      );
    }
  }
}

ResultsListComponent.displayName = 'ResultsListComponent';

// Uncomment properties you need
// ResultsListComponent.propTypes = {};
// ResultsListComponent.defaultProps = {};

export default ResultsListComponent;
