import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import toastr from "toastr";
import BookmarkForm from "./BookmarkForm";
import {
  startUpdateBookmark,
  startRemoveBookmark
} from "../../actions/bookmarkActions";
import foldersFormattedForDropDown from "../../selectors/foldersFormattedForDropDown";

export class EditBookmark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folderId: props.bookmark.folderId ? props.bookmark.folderId : ""
    };
  }
  
  onUpdateBookmark = bookmark => {
    this.props
      .startUpdateBookmark(this.props.bookmark.id, bookmark)
      .then(() => {
        this.props.history.push(`/folder/${bookmark.folderId}`);
        toastr.success("Bookmark updated.");
      });
  };

  onRemoveBookmark = bookmark => {
    const id = this.props.bookmark.id;
    const folderId = this.state.folderId;

    this.props.startRemoveBookmark({ id }).then(() => {
      this.props.history.push(`/folder/${folderId}`);
      toastr.success("Bookmark Removed.");
    });
  };

  render() {
    return (
      <div className="main">
        <BookmarkForm
          bookmark={this.props.bookmark}
          onUpdateBookmark={this.onUpdateBookmark}
          folders={this.props.folders}
          selectedValue={this.state.folderId}
          onRemoveBookmark={this.onRemoveBookmark}
          updating={this.state.updating}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  bookmark: state.bookmarks.find(
    bookmark => bookmark.id === props.match.params.id
  ),
  folders: foldersFormattedForDropDown(state.folders)
});

const mapDispatchToProps = (dispatch, props) => ({
  startUpdateBookmark: (id, updates) =>
    dispatch(startUpdateBookmark(id, updates)),
  startRemoveBookmark: id => dispatch(startRemoveBookmark(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBookmark);
