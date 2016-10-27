import React, {PropTypes} from 'react';
import ClipboardButton from 'react-clipboard.js';


export default class InviteLink extends React.Component {
  render() {
    return (
      <div className="flex" style={{margin: '1rem 0'}}>
        <div className="url-to-copy">
          {this.props.inviteUrl}
        </div>
        <div>
          <ClipboardButton
            className="btn btn-secondary-darker"
            data-clipboard-text={this.props.inviteUrl}
          >
            <i className="fa fa-clipboard"/>
          </ClipboardButton>
        </div>
      </div>
    );
  }
}

InviteLink.propTypes = {
};
