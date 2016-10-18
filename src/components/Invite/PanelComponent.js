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
    this.submitPreferencesToFirebase = this.submitPreferencesToFirebase.bind(this);

    this.placeDict = {};
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
    ]);
    //remove from no if added to yes and vice versa
    var otherArr = arr === 'yes' ? 'no' : 'yes';
    cuisine[otherArr] = cuisine[otherArr].filter((c)=>{
      return c.id !== id;
    });
    this.props.updatePreferences({cuisine: cuisine});
  }

  onGeoSuggest(direction, data) {
    var locations = this.props.data.locations;
    locations[direction].latitude = data.location.lat;
    locations[direction].longitude = data.location.lng;
    locations[direction].label = data.label;
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
      let cl = 'btn';
      if (price.indexOf(num) > -1) {
        cl += ' btn-secondary-darker'
      } else {
        cl += ' btn-secondary'
      }
      return (
        <button type="button" className={cl}
        onClick={(e) => {
        if (price.indexOf(num) > -1) {
          price = _.without(price, num);
        } else {
          price.push(num);
        }
        this.props.updatePreferences({price:price});
      }}
        >
          {'$'.repeat(num)}
        </button>
      )
      return <label key={'price-indicator-' + num}>
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
      transit: 'transit',
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
      let cl = 'btn';
      if (this.props.data.locations[direction].mode === p[0]) {
        cl += ' btn-secondary-darker'
      } else {
        cl += ' btn-secondary'
      }
      return (
        <button type="button"
         className={cl}
         onClick = {() => {
         var location = this.props.data.locations;
         location[direction].mode = p[0];
         this.props.updatePreferences({location: location});
       }}
         >
          <i className={iconDict[p[0]]}/> { p[1] }
        </button>
      )
    });
  }

  componentDidMount(){
    //get rid of focus
    [].slice.apply(ReactDOM.findDOMNode(this).querySelectorAll('input'))
    .forEach(function(input){
      input.blur();
    });
  }

  submitPreferencesToFirebase (e){
    e.preventDefault();
    this.props.submitPreferencesToFirebase();
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

    var yelpPlaceholder = (this.props.meal === 'Drinks') ? 'Add a type of bar' : 'Add a cuisine';

    const geoValue = this.props.data.locations.from.label || '';

    debugger

    return (
        <form className='centered-component'
              onSubmit={this.submitPreferencesToFirebase}>
          <fieldset>
            <legend style={{display:'inline'}}>Price:&nbsp;&nbsp;</legend>
            <div className="btn-group btn-group--equal-width"
                 role="group"
                 aria-label="Pick mode of transport">
              {this.renderPriceOptions()}
            </div>
          </fieldset>
          <fieldset className="cuisine-yes">
            <legend>
              {this.props.meal === 'Drinks' ? 'I\'m thirsty for:' : 'I\'m hungry for:'}
              &nbsp;<span className="weight-300 pull-right text-muted">optional</span>
            </legend>
              <ReactTags
                tags={this.props.data.cuisine.yes}
                suggestions={yelpNames}
                minQueryLength={1}
                handleDelete={this.handleDelete.bind(this, 'yes')}
                handleAddition={this.handleAddition.bind(this, 'yes')}
                placeholder={yelpPlaceholder}
                inputTop={true}
                showSuggestionsOnFocus={true}
                ref={ (d)=> this.cuisineYes = d }
                />
          </fieldset>
          <fieldset className="cuisine-no">
            <legend>I don't want: <span className="weight-300 pull-right text-muted">optional</span></legend>
              <ReactTags
                tags={this.props.data.cuisine.no}
                suggestions={yelpNames}
                minQueryLength={1}
                handleDelete={this.handleDelete.bind(this, 'no')}
                handleAddition={this.handleAddition.bind(this, 'no')}
                placeholder={yelpPlaceholder}
                inputTop={true}
                showSuggestionsOnFocus={true}
                />
          </fieldset>
          <fieldset>
            <legend>I'm coming from:</legend>
              <Geosuggest
                country='us'
                placeholder='Select an address'
                onSuggestSelect={this.onGeoSuggest.bind(this, 'from')}
                initialValue={geoValue}
                />
            <div className='form-check'>
            <div className="btn-group btn-group--equal-width"
                 role="group"
                 aria-label="Pick mode of transport">
              { this.renderTransportOptions('from') }
            </div>
            </div>
          </fieldset>
          <fieldset>
          <div className="form-check">
              <label className="form-check-label">
                <input
                className="form-check-input"
                type="checkbox"
                checked={this.props.notificationsOn ? true : false}
                onChange={ (e)=> {debugger;this.props.setNotifications(!this.props.notificationsOn)}  }
                />
                  Notify me when it's time to vote, and when results are in
              </label>
          </div>
          </fieldset>
          <br/>
          <button
          className="btn btn-primary btn-block"
          >
          submit my preferences
          </button>
        </form>
    );
  }
}


// Uncomment properties you need
// PanelComponent.propTypes = {};
// PanelComponent.defaultProps = {};

export default PanelComponent;
