import React, {PropTypes} from 'react';
import CountdownClock from 'react-countdown-clock'


//hack to fix multiple event listener issu
export default class CountdownWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate (nextProps){
    return false
  }

  render() {
    return (
      <CountdownClock {...this.props}/>
    );
  }
}
