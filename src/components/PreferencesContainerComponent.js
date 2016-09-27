'use strict';

import React from 'react';
import PreferencesPanel from './PanelComponent';
import { connect } from 'react-redux'

import { fetchMatches, updatePreferences } from 'actions/index'


function mapStateToProps(state){
  return {
    preferences : state.preferences,
    visibleUsers : state.visibleUsers,
    requestState : state.matches.requestState
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
    return (
      <div className="preferencescontainer-component">
        <div className="panel-container">
          {
            _.map(this.props.preferences, function(v,k){
              var num = parseInt(k.split(' ')[1]);
              if (num <= this.props.visibleUsers){
                return <PreferencesPanel
                  key={k + '-preferencepanel'}
                  userId = { k }
                  data = {v}
                  updatePreferences = {_.partial(this.props.updatePreferences, k)}
                  />
              } else {
                return ''
              }
            }, this)
          }
        </div>
        <div>
          <button
            className="btn btn-primary"
            style={{display: 'block', margin : 'auto'}}
            onClick={this.props.fetchMatches}
            >
            <i className={ this.props.requestState ?
                "fa fa-refresh fa-spin" :
                "fa fa-search" }/>&nbsp;
             Find Restaurants
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
