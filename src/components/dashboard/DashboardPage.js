import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FolderList from '../bookmark-folder/FolderList';

export class Dashboard extends Component {
  render() {
    return (
      <FolderList folders={this.props.folders} />
    );
  };
};

Dashboard.propTypes = {
  folders: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    folders: state.folders
  };
}

export default connect(mapStateToProps)(Dashboard);