import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import FolderForm from './FolderForm';
import { startCreateFolder, startUpdateFolder } from '../../actions/folderActions';
import BookmarkList from '../bookmark/BookmarkList';
import selectBookmarks from '../../selectors/bookmarksSelector';

export class ManageFolder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      folder: Object.assign({}, this.props.folder),
      errors: {},
      saving: false,
      updating: false
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.folder.id != nextProps.folder.id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({ folder: Object.assign({}, nextProps.folder) });
    }
  }

  updateFolderState = (e) => {
    const field = e.target.name;
    let folder = Object.assign({}, this.state.folder);
    folder[field] = e.target.value;
    return this.setState({ folder: folder });
  }

  folderFormIsValid = () => {
    let formIsValid = true;
    let errors = {};

    // if (this.state.course.title.length < 5) {
    //   errors.title = 'Title must be at least 5 characters.';
    //   formIsValid = false;
    // }

    this.setState({ errors: errors });
    return formIsValid;
  }

  updateFolder = (e) => {
    e.preventDefault();
    if (!this.folderFormIsValid()) {
      return;
    }
    this.state.folder.updatedAt = Date.now();
    this.setState({ saving: true });
    this.props.startUpdateFolder(this.props.folder.id, this.state.folder);
    this.props.history.push('/');
  }

  saveFolder = (e) => {
    e.preventDefault();

    if (!this.folderFormIsValid()) {
      return;
    }
    
    this.setState({ saving: true });
    this.props.startCreateFolder(this.state.folder);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <FolderForm
          folder={this.state.folder}
          onChange={this.updateFolderState}
          onUpdate={this.updateFolder}
          onSave={this.saveFolder}
          errors={this.state.errors}
          allFolders={this.props.folders}
          saving={this.state.saving}
          updating={this.state.updating}
        />
        <BookmarkList bookmarks={this.props.bookmarks} />
      </div>
    );
  }

}

ManageFolder.propTypes = {
  bookmarks: PropTypes.array.isRequired,
  folder: PropTypes.object.isRequired
};

const getFolderById = (folders, id) => {
  const folder = folders.filter(folder => folder.id == id);
  if (folder) return folder[0]; //since filter returns an array, have to grab the first.
  return null;
}

const mapStateToProps = (state, ownProps) => {
  const folderId = ownProps.match.params.id;// from the path `/folder/:id`

  let folder = { id: '', title: '', desc: '', bookmarks: {}, createdAt: Date.now(), updatedAt: 0 };

  if (folderId && state.folders.length > 0) {
    folder = getFolderById(state.folders, folderId);
  }

  return {
    folder: folder,
    bookmarks: selectBookmarks(state.bookmarks, folderId)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startCreateFolder: (folder) => dispatch(startCreateFolder(folder)),
    startUpdateFolder: (id, folder) => dispatch(startUpdateFolder(id, folder))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageFolder);