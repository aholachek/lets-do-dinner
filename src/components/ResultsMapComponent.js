'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/dist/react-dom-server';
import _ from 'lodash';

import userIcon from './../images/user.png';


var iconDict = {
  transit: 'fa fa-fw fa-subway',
  driving: 'fa fa-fw fa-car',
  bicycling: 'fa fa-fw fa-bicycle',
  walking: 'fa fa-fw fa-male'
}

//template for map tooltip
function Tooltip(props) {
  return <div>
    <div><span className="map-tooltip__header">{props.name}</span></div>
    <div>{_.map(props.time.individual, function(v,k){
        return <div>
          <b>{k}</b>:&nbsp;&nbsp;
          <i className={iconDict[v.mode]} />
          &nbsp;&nbsp;
          <b>{v.time}</b>&nbsp;
           minutes</div>
      })}</div>
  </div>;
}


class ResultsMapComponent extends React.Component {

  componentWillReceiveProps (newProps){

    if (!newProps || !newProps.data || newProps === this.props) return;

    var mapDiv = ReactDOM.findDOMNode(this).querySelector('.map');
    var map = new google.maps.Map(mapDiv,{
      styles: [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}]
    }
    );

    var bounds = new google.maps.LatLngBounds();

    _.forEach(newProps.userData, function(v, k){

      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(v.locations.from.latitude, v.locations.from.longitude),
          map: map,
          icon: userIcon,
      });

      var infowindow = new google.maps.InfoWindow({
            content: k
          });

      marker.addListener('mouseover', function() {
          infowindow.open(map, marker);
        });

      marker.addListener('mouseout', function() {
          infowindow.close(map, marker);
        });

      bounds.extend(marker.position);

    });

    newProps.data.forEach(function(d, i){

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(d.coordinates.latitude, d.coordinates.longitude),
        map: map,
        label : (i + 1) + '',
    });

    var contentString = ReactDOMServer.renderToString(Tooltip(d));

    var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

    marker.addListener('mouseover', function() {
        infowindow.open(map, marker);
      });

      marker.addListener('mouseout', function() {
          infowindow.close(map, marker);
        });

    bounds.extend(marker.position);
    });

    map.fitBounds(bounds);
}


  render() {
    return (
      <div className="resultsmap-component">
        <div className="map">
        </div>
      </div>
    );
  }
}

ResultsMapComponent.displayName = 'ResultsMapComponent';

// Uncomment properties you need
// ResultsMapComponent.propTypes = {};
// ResultsMapComponent.defaultProps = {};

export default ResultsMapComponent;
