'use strict';

import React from 'react';
import _ from 'lodash';

// assuming 5 max stars
function renderStars(rating) {
  var wholeStars = Math.floor(rating);
  var stars = _.range(wholeStars)
  .map(()=> { <i className="fa fa-star "/>})

  if (rating.toString().indexOf('.5') > -1) {
    stars.push(
      <i className="fa fa-star-half-o "></i>
    )
  }
  if (5 - rating > 0) {
    _.range(5 - Math.ceil(rating)).forEach(function() {
      stars.push(
        <i className="fa fa-star-o "></i>
      )
    })
  }
  return stars;
}

let RatingComponent = (props) => (
  <span className="rating-component">
    { renderStars(props.rating) }
  </span>
);


RatingComponent.propTypes = {
  rating : React.PropTypes.number.isRequired
};

export default RatingComponent;
