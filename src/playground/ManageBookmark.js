import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import toastr from "toastr";
import BookmarkForm from "./BookmarkForm";
import foldersFormattedForDropDown from "../../selectors/foldersFormattedForDropDown";
import {
  startCreateBookmark,
  startUpdateBookmark,
  startRemoveBookmark
} from "../../actions/bookmarkActions";
import Header from "../common/Header";

export class ManageBookmark extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmark: Object.assign({}, this.props.bookmark),
      errors: {},
      saving: false,
      updating: false,
      removing: false,
      selectedFolderId: ""
    };
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.bookmark.id != nextProps.bookmark.id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({ bookmark: Object.assign({}, nextProps.bookmark) });
    }
  };

  updateBookmarkState = e => {
    const field = e.target.name;
    let bookmark = Object.assign({}, this.state.bookmark);
    bookmark[field] = e.target.value;
    return this.setState({ bookmark: bookmark });
  };

  bookmarkFormIsValid = () => {
    let formIsValid = true;
    let errors = {};

    if (this.state.bookmark.title.length === 0) {
      errors.title = "You must enter title";
      formIsValid = false;
    }

    if (this.state.bookmark.href.length === 0) {
      errors.href = "You must enter link";
      formIsValid = false;
    }

    if (this.state.bookmark.folderId.length === 0) {
      errors.folderId = "You must select bookmark folder";
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  };

  updateBookmark = e => {
    e.preventDefault();
    if (!this.bookmarkFormIsValid()) {
      return;
    }
    this.setState({ updating: true });
    // We don't want to change state directly
    // https://medium.freecodecamp.org/handling-state-in-react-four-immutable-approaches-to-consider-d1f5c00249d5

    const bookmark = {
      ...this.state.bookmark,
      updatedAt: Date.now(),
      iconURL:
        "http://s2.googleusercontent.com/s2/favicons?domain_url=" +
        this.state.bookmark.href
    };
    this.props.startUpdateBookmark(this.props.bookmark.id, bookmark);
    toastr.success("Bookmark updated.");
    this.props.history.push("/");
  };

  removeBookmark = e => {
    e.preventDefault();
    this.setState({ removing: true });
    this.props.startRemoveBookmark({ id: this.props.bookmark.id });
    toastr.success("Bookmark removed.");
    this.props.history.push("/");
  };

  saveBookmark = e => {
    e.preventDefault();
    if (!this.bookmarkFormIsValid()) {
      return;
    }

    const bookmark = {
      ...this.state.bookmark,
      iconURL:
        "http://s2.googleusercontent.com/s2/favicons?domain_url=" +
        this.state.bookmark.href
    };

    this.setState({ saving: true });
    this.props.startCreateBookmark(bookmark).then(folderId => {
      this.props.history.push(`/folder/${folderId}`);
      toastr.success("Bookmark saved.");
    });
  };

  render() {
    return (
      <div className="main">
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
          selectedFolderId={this.props.bookmark.folderId}
        />
      </div>
    );
  }
}

ManageBookmark.propTypes = {
  bookmark: PropTypes.object.isRequired,
  folders: PropTypes.array.isRequired,
  startUpdateBookmark: PropTypes.func.isRequired,
  startRemoveBookmark: PropTypes.func.isRequired,
  startCreateBookmark: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const getBookmarkById = (bookmarks, id) => {
  const bookmark = bookmarks.filter(bookmark => bookmark.id == id);
  if (bookmark) return bookmark[0]; //since filter returns an array, have to grab the first.
  return null;
};

const mapStateToProps = (state, ownProps) => {
  const bookmarkId = ownProps.match.params.id; // from the path `/bookmark/:id`
  const folderLinkId = ownProps.match.params.folderId;

  let bookmark = {
    id: "",
    href: "",
    title: "",
    iconURL: "",
    createdAt: Date.now(),
    updatedAt: 0,
    folderId: folderLinkId ? folderLinkId : ""
  };

  if (bookmarkId && state.bookmarks.length > 0) {
    bookmark = getBookmarkById(state.bookmarks, bookmarkId);
  }

  return {
    bookmark: bookmark,
    folders: foldersFormattedForDropDown(state.folders)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startCreateBookmark: bookmark => dispatch(startCreateBookmark(bookmark)),
    startUpdateBookmark: (id, updates) =>
      dispatch(startUpdateBookmark(id, updates)),
    startRemoveBookmark: id => dispatch(startRemoveBookmark(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBookmark);
