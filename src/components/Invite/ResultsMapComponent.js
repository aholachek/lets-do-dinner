'use strict';

import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/dist/react-dom-server'
import _ from 'lodash'
import mapStyles from 'data/map_styles.json'

import userIcon from 'images/user.png'

let iconDict = {
  transit: 'fa fa-fw fa-subway',
  driving: 'fa fa-fw fa-car',
  bicycling: 'fa fa-fw fa-bicycle',
  walking: 'fa fa-fw fa-male'
};

//template for map tooltip
function EstablishmentTooltip(props, userDict) {
  return <div>
    <div>
      <span className="map-tooltip__header">{props.name}</span>
    </div>
    <div>{_.map(props.time.origins, function(v, k) {
        return <div>
          <b>{userDict[k]}</b>:&nbsp;&nbsp;
          <i className={iconDict[v.mode]}/>
          &nbsp;&nbsp;
          <b>{Math.ceil(v / 60)}</b>&nbsp; minutes</div>
      })}</div>
  </div>;
}

function PersonTooltip(props, userDict) {
  return <div>
    <div>
      <span className="map-tooltip__header">{userDict[props.userId]}</span>
    </div>
    <div>
      <i className={iconDict[props.locations.to.mode]}/> {props.locations.to.mode}
    </div>
  </div>
}

class ResultsMapComponent extends React.Component {

  componentDidMount() {
      this.buildMap.call(this, this.props);
  }

  componentDidUpdate(){
    this.buildMap.call(this, this.props);
  }

  buildMap(props) {
    let mapDiv = ReactDOM.findDOMNode(this).querySelector('.map');
    let map = new google.maps.Map(mapDiv, {
      styles: mapStyles
    });

    let bounds = new google.maps.LatLngBounds();

    props.userData.forEach(function(d) {

      //might be a person with no data (bc only 2 people were selected e.g.)
      if (!d.locations.from.latitude || !d.locations.from.longitude) {
        return;
      }

      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(d.locations.from.latitude, d.locations.from.longitude),
        map: map,
        icon: userIcon
      });

      let contentString = ReactDOMServer.renderToString(PersonTooltip(d, props.userDict));

      let infowindow = new google.maps.InfoWindow({content: contentString});

      marker.addListener('mouseover', function() {
        infowindow.open(map, marker);
      });

      marker.addListener('mouseout', function() {
        infowindow.close(map, marker);
      });

      bounds.extend(marker.position);

    });

    props.data.forEach(function(d, i) {

      //there is some kind of unknown bug messing with fitbounds very occasionally
      if (!d.coordinates.latitude || !d.coordinates.longitude) {
        console.error("missing location data for ", d);
        return;
      }

      let iconImg, markerSize;

      if (this.props.votes.indexOf(d.id) > -1) {
         iconImg = 'http://maps.google.com/mapfiles/kml/paddle/purple-stars.png';
         markerSize = new google.maps.Size(38, 38)
      } else {
         iconImg = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
         markerSize = new google.maps.Size(33, 33)
        }

      //control the size
      let icon = new google.maps.MarkerImage(
        iconImg,
         null, /* size is determined at runtime */
         null, /* origin is 0,0 */
         null, /* anchor is bottom center of the scaled image */
         markerSize
      );

      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(d.coordinates.latitude, d.coordinates.longitude),
        map: map,
        icon : icon
      });

      let contentString = ReactDOMServer.renderToString(EstablishmentTooltip(d, props.userDict));

      let infowindow = new google.maps.InfoWindow({content: contentString});

      marker.addListener('mouseover', function() {
        infowindow.open(map, marker);
      });

      marker.addListener('mouseout', function() {
        infowindow.close(map, marker);
      });

      bounds.extend(marker.position);

    }, this);

    map.fitBounds(bounds);
  }

  render() {
    return (
      <div className="resultsmap-component">
        <div className="map"></div>
      </div>
    );
  }
}

// Uncomment properties you need
// ResultsMapComponent.propTypes = {};
// ResultsMapComponent.defaultProps = {};

export default ResultsMapComponent;
