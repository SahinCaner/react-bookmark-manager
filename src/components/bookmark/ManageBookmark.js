import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BookmarkForm from './BookmarkForm';
import { startCreateBookmark } from '../../actions/bookmarkActions';
import foldersFormattedForDropDown from '../../selectors/foldersFormattedForDropDown';
import { startUpdateBookmark, startRemoveBookmark } from '../../actions/bookmarkActions';

export class ManageBookmark extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmark: Object.assign({}, this.props.bookmark),
      errors: {},
      saving: false,
      updating: false,
      removing: false
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.bookmark.id != nextProps.bookmark.id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({ bookmark: Object.assign({}, nextProps.bookmark) });
    }
  }

  updateBookmarkState = (e) => {
    const field = e.target.name;
    let bookmark = Object.assign({}, this.state.bookmark);
    bookmark[field] = e.target.value;
    return this.setState({ bookmark: bookmark });
  }

  bookmarkFormIsValid = () => {
    let formIsValid = true;
    let errors = {};

    // if (this.state.course.title.length < 5) {
    //   errors.title = 'Title must be at least 5 characters.';
    //   formIsValid = false;
    // }

    this.setState({ errors: errors });
    return formIsValid;
  }

  updateBookmark = (e) => {
    e.preventDefault();
    if (!this.bookmarkFormIsValid()) {
      return;
    }

    this.state.bookmark.updatedAt = Date.now();
    this.props.startUpdateBookmark(this.props.bookmark.id, this.state.bookmark);
    this.props.history.push('/');
  }

  removeBookmark = (e) => {
    e.preventDefault();
    this.props.startRemoveBookmark({ id: this.props.bookmark.id });
    this.props.history.push('/');
  }

  saveBookmark = (e) => {
    e.preventDefault();
    if (!this.bookmarkFormIsValid()) {
      return;
    }
    this.setState({ saving: true });
    this.props.startCreateBookmark(this.state.bookmark);
    this.props.history.push('/');
  }

  render() {
    return (
      <BookmarkForm
        bookmark={this.state.bookmark}
        onChange={this.updateBookmarkState}
        onSave={this.saveBookmark}
        onUpdate={this.updateBookmark}
        onRemove={this.removeBookmark}
        errors={this.state.errors}
        allFolders={this.props.folders}
        saving={this.state.saving}
        updating={this.state.updating}
      />
    );
  }
}

ManageBookmark.propTypes = {
  bookmark: PropTypes.object.isRequired,
  folders: PropTypes.array.isRequired
};

const getBookmarkById = (bookmarks, id) => {
  const bookmark = bookmarks.filter(bookmark => bookmark.id == id);
  if (bookmark) return bookmark[0]; //since filter returns an array, have to grab the first.
  return null;
}

const mapStateToProps = (state, ownProps) => {
  const bookmarkId = ownProps.match.params.id; // from the path `/bookmark/:id`

  let bookmark = { id: '', href: '', title: '', folderId: '', createdAt: Date.now(), updatedAt: 0 };

  if (bookmarkId && state.bookmarks.length > 0) {
    bookmark = getBookmarkById(state.bookmarks, bookmarkId);
  }

  return {
    bookmark: bookmark,
    folders: foldersFormattedForDropDown(state.folders)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startCreateBookmark: (bookmark) => dispatch(startCreateBookmark(bookmark)),
    startUpdateBookmark: (id, updates) => dispatch(startUpdateBookmark(id, updates)),
    startRemoveBookmark: (id) => dispatch(startRemoveBookmark(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBookmark);