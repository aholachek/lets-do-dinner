import React, {PropTypes} from 'react';
import ClipboardButton from 'react-clipboard.js';


export default class InviteLink extends React.Component {
  render() {
    return (
      <div style={{margin: '1rem 0'}}>
        <div className="url-to-copy">
          {this.props.inviteUrl}
        </div>
        <div>
          <ClipboardButton
            className="btn btn-secondary-darker btn-block btn-sm"
            data-clipboard-text={this.props.inviteUrl}
          >
            <i className="fa fa-clipboard"/>
            &nbsp;click to copy invite link
          </ClipboardButton>
        </div>
      </div>
    );
  }
}

InviteLink.propTypes = {
};
