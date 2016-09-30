'use strict';

import React from 'react';
import PreferencesPanel from './PanelComponent';
import { connect } from 'react-redux'

import { fetchMatches, updatePreferences } from 'actions/index'


function mapStateToProps(state){
  return {
    preferences : state.preferences,
    visibleUsers : state.visibleUsers,
    requestState : state.matches.requestState,
    //dinner or drinks
    meal : state.meal
  }

}

function mapDispatchToProps(dispatch){
  return {
    fetchMatches : function(){
      dispatch(fetchMatches());
    },
    updatePreferences : function(id, data){
      dispatch(updatePreferences(id, data))
    }
  }
}


class PreferencesContainerComponent extends React.Component {

  render() {
    //disable submit until all visible users have a location
    var btnClass = "btn btn-primary";
    const incomplete = this.props.preferences.slice(0, this.props.visibleUsers).filter(function(u){
      return u.locations.from.latitude === undefined
    }).length > 0;
    if (incomplete) btnClass += " disabled";
    return (
      <div className="preferencescontainer-component">
        <div className="panel-container">
          {
            this.props.preferences.map(function(obj){
              var name = obj.userId;
              var num = parseInt(name.split(' ')[1]);
              if (num <= this.props.visibleUsers){
                return <PreferencesPanel
                  key={name + '-preferencepanel'}
                  userId = { name }
                  data = {obj }
                  meal = { this.props.meal }
                  updatePreferences = {_.partial(this.props.updatePreferences, name)}
                  />
              } else {
                return ''
              }
            }, this)
          }
        </div>
        <div>
          <button
            className={btnClass}
            style={{display: 'block', margin : 'auto'}}
            onClick={function(){
              if (!incomplete) this.props.fetchMatches()
            }.bind(this)}
            >
            <i className={ this.props.requestState === 'loading'?
                "fa fa-refresh fa-spin" :
                "fa fa-search" }/>&nbsp;
             Find {this.props.meal === 'Dinner' ? 'Restaurants' : 'Bars'}
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreferencesContainerComponent);
