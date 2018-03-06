import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FolderForm from './FolderForm';
import { startCreateFolder } from '../../actions/folderActions';

export class CreateFolder extends Component {
  onSubmit = (folder) => {
    this.props.startCreateFolder(folder);
    this.props.history.push('/');
  };
  render() {
    return (
      <FolderForm onSubmit={this.onSubmit} />
    );
  }
}

CreateFolder.propTypes = {
  startCreateFolder: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  startCreateFolder: (folder) => dispatch(startCreateFolder(folder))
});

export default connect(undefined, mapDispatchToProps)(CreateFolder);
