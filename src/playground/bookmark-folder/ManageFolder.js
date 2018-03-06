import React, { Component } from 'react';
import { connect } from 'react-redux';
import FolderForm from './FolderForm';
import { startRemoveFolder, startUpdateFolder } from '../../actions/folderActions';
import { startSetBookmarks, startCreateBookmark } from '../../actions/bookmarkActions';
import BookmarkForm from '../bookmark/BookmarkForm';
import BookmarkList from '../bookmark/BookmarkList';
import selectBookmarks from '../../selectors/bookmarksSelector';

export class ManageFolder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonName: 'Update Folder'
    };
  }

  onFolderRemove = () => {
    this.props.startRemoveFolder({ id: this.props.folder.id });
    this.props.history.push('/');
  }

  onFolderSubmit = (folder) => {
    this.props.startUpdateFolder(this.props.folder.id, folder);
    this.props.history.push('/');
  }

  onBookmarkSubmit = (bookmark) => {
    this.props.startCreateBookmark(bookmark, this.props.match.params.id);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        {/* <FolderForm
          folder={this.props.folder}
          onSubmit={this.onFolderSubmit}
          buttonName={this.state.buttonName}
        />
        <button onClick={this.onFolderRemove}> Remove Folder </button> */}
        <BookmarkList 
          bookmarks={this.props.bookmarks} />
        <BookmarkForm
          onSubmit={this.onBookmarkSubmit} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    folder: state.folders.find((folder) => folder.id === props.match.params.id),
    bookmarks: selectBookmarks(state.bookmarks, props.match.params.id)
  }
};

const mapDispatchToProps = (dispatch) => ({
  startRemoveFolder: (id) => dispatch(startRemoveFolder(id)),
  startUpdateFolder: (id, folder) => dispatch(startUpdateFolder(id, folder)),
  startCreateBookmark: (bookmark, folderId) => dispatch(startCreateBookmark(bookmark, folderId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageFolder);

