'use strict';

import React from 'react';
import _ from 'lodash';
import FlipMove from 'react-flip-move';
import ResultListItem from './ResultListItem';

class ResultsListComponent extends React.Component {

  constructor(props) {
    super(props);
    this.renderListItem = this.renderListItem.bind(this);
  }

  renderListItem(l, i) {

    let d = _.findWhere(this.props.userData, {userId: this.props.userId});
    //get total minutes for this user to this destination
    let time = l.time.origins[this.props.userId];

    return (
      <ResultListItem
        data={l}
        collapsed={this.props.votes.indexOf(l.id) === -1}
        updateVote={this.props.updateVote}
        time={time}
        userData ={d}
        index={i}
        key={l.id}
      />
    )
  }

  render() {
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

// Uncomment properties you need
// ResultsListComponent.propTypes = {};
// ResultsListComponent.defaultProps = {};

export default ResultsListComponent;
