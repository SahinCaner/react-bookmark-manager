import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import toastr from "toastr";
import BookmarkForm from "./BookmarkForm";
import { startCreateBookmark } from "../../actions/bookmarkActions";
import foldersFormattedForDropDown from "../../selectors/foldersFormattedForDropDown";
import Box from "../common/box/Box";
import BoxHeader from "../common/box/BoxHeader";
import BoxBody from "../common/box/BoxBody";
import BoxItem from "../common/box/BoxItem";
import ButtonList from "../common/button-list/ButtonList";
import Banner from "../common/banner/Banner";

export class AddBookmark extends React.Component {
  onAddBookmark = bookmark => {
    this.props.startCreateBookmark(bookmark).then(() => {
      this.props.history.push(`/folder/${bookmark.folderId}`);
      toastr.success("Bookmark added.");
    });
  };
  render() {
    return (
      <div className="main">
        {this.props.folders.length > 0 ? (
          <BookmarkForm
            onAddBookmark={this.onAddBookmark}
            folders={this.props.folders}
            selectedValue={this.props.folderId}
          />
        ) : (
          <div className="main__item main__item--content">
            <div className="container">
              <Banner
                title="You have no folder to add a bookmark."
                subtitle="Folders are essential for good organization."
                microcopy="-Once you have folders, you will be able to add bookmarks to
                  the folders."
                emoji="&#x1F605;"
              >
                <Link to={`/add/folder`} className="btn btn--primary">
                  CREATE FOLDER FIRST
                </Link>
              </Banner>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    folders: foldersFormattedForDropDown(state.folders),
    folderId: props.match.params.folderId
  };
};

const mapDispatchToProps = dispatch => ({
  startCreateBookmark: bookmark => dispatch(startCreateBookmark(bookmark))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBookmark);
