import React from 'react';
import ReactDOM from 'react-dom';

import YelpCategories from 'data/yelp_categories.json';
import {WithContext as ReactTags} from 'react-tag-input';
import Geosuggest from 'react-geosuggest';
import _ from 'lodash';


class PanelComponent extends React.Component {
  constructor() {
    super();

    this.getFormValues = this.getFormValues.bind(this);
    this.renderPriceOptions = this.renderPriceOptions.bind(this);
    this.renderTransportOptions = this.renderTransportOptions.bind(this);
  }

  handleDelete(arr, i) {
    var cuisine = this.props.data.cuisine;
    cuisine[arr] = cuisine[arr].filter(function(a, ind) {
      return ind !== i
    });
    this.props.updatePreferences({cuisine: cuisine});
  }

  handleAddition(arr, val) {
    var id = _.findWhere(YelpCategories, {title: val}).alias;
    var cuisine = this.props.data.cuisine;
    cuisine[arr] = cuisine[arr].concat([
      {
        id: id,
        text: val
      }
    ])
    this.props.updatePreferences({cuisine: cuisine});
  }

  onGeoSuggest(direction, data) {
    var locations = this.props.data.locations;
    locations[direction].latitude = data.location.lat;
    locations[direction].longitude = data.location.lng;
    this.props.updatePreferences({locations: locations});
  }

  getFormValues() {
    var form = _.cloneDeep(this.state);
    var transformedCuisine = ['yes', 'no'].map(function(w) {
      return {
        [w]: form.cuisine[w].map(function(item) {
          return item.id
        })
      }
    });
    transformedCuisine = _.extend(transformedCuisine[0], transformedCuisine[1]);
    form.preferences = {
      //turn it back into an object --> easier way to do this
      cuisine: transformedCuisine,
      price: form.price
    };
    return _.omit(form, 'cuisine', 'price');
  }

  renderPriceOptions() {
    var price = this.props.data.price;
    return _.range(1, 5).map((num) => {
      return <label>
        <input type='checkbox'
          name='price'
          value={num}
          checked={(price.indexOf(num) > -1)}
          onChange={(e) => {
          if (e.target.checked) {
            price.push(num);
          } else {
            price = _.without(price, num);
          }
          this.props.updatePreferences({price: _.uniq(price)});
        }}/>&nbsp;{'$'.repeat(num)}</label>
    });
  }

  renderTransportOptions(direction) {
    var transportDict = {
      transit: 'public transport',
      driving: 'driving',
      bicycling: 'biking',
      walking: 'walking'
    };

    var iconDict = {
      transit: 'fa fa-fw fa-subway',
      driving: 'fa fa-fw fa-car',
      bicycling: 'fa fa-fw fa-bicycle',
      walking: 'fa fa-fw fa-male'
    };

    return _.pairs(transportDict).map((p) => {
      return (
        <label className='form-check-label'>
          <input type='radio'
            className='form-check-input'
            name={'transport-' + direction}
            value={p[0]}
            checked={(this.props.data.locations[direction].mode === p[0])}
            onChange={() => {
            var location = this.props.data.locations;
            location[direction].mode = p[0];
            this.props.updatePreferences({location: location});
          }}/> <i className={iconDict[p[0]]}/> { p[1] }
        </label>
      )
    });
  }

  render() {

    //show only restaurants or bars in autocomplete
    var yelpNames = YelpCategories.filter(function(d) {
      if (this.props.meal === 'Dinner'){
          return (d.parents.indexOf('restaurants') > -1)
      } else if (this.props.meal === 'Drinks'){
        return (d.parents.indexOf('bars') > -1)
      } else {
        console.error('I cant handle this meal name : ', this.props.meal);
      }
    }, this).map(function(d){
        return d.title;
    });

    var yelpPlaceholder = (this.props.meal === 'Drinks') ? 'Add a type of bar' : 'Add a cuisine'

    return (
      <div className='panel-component'>
        <h2 style={{
          fontSize: '1.2rem'
        }}>
          { this.props.userId }
        </h2>
        <hr/>
        <form action=''>
          <fieldset>
            <legend style={{display:'inline'}}>Price:&nbsp;&nbsp;</legend>
            <span className='price-container'>
              {this.renderPriceOptions()}
            </span>
          </fieldset>
          <fieldset className="cuisine-yes">
            <legend>
              {this.props.meal === 'Drinks' ? 'I\'m thirsty for:' : 'I\'m hungry for:'}
            </legend>
              <ReactTags
                tags={this.props.data.cuisine.yes}
                suggestions={yelpNames}
                minQueryLength={1}
                handleDelete={this.handleDelete.bind(this, 'yes')}
                handleAddition={this.handleAddition.bind(this, 'yes')}
                placeholder={yelpPlaceholder}
                inputTop={true}
                />
          </fieldset>
          <fieldset className="cuisine-no">
            <legend>I don't want:</legend>
              <ReactTags
                tags={this.props.data.cuisine.no}
                suggestions={yelpNames}
                minQueryLength={1}
                handleDelete={this.handleDelete.bind(this, 'no')}
                handleAddition={this.handleAddition.bind(this, 'no')}
                placeholder={yelpPlaceholder}
                inputTop={true}
                />
          </fieldset>
          <fieldset>
            <legend>I'm coming from:</legend>
              <Geosuggest
                country='us'
                placeholder='Select a location'
                onSuggestSelect={this.onGeoSuggest.bind(this, 'from')}
                />
            <div className='form-check'>
              {this.renderTransportOptions('from')}
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}


// Uncomment properties you need
// PanelComponent.propTypes = {};
// PanelComponent.defaultProps = {};

export default PanelComponent;
