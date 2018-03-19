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
        {/* Check if user has folder or not */}
        {this.props.folders.length !== 0 ? (
          <BookmarkForm
            onAddBookmark={this.onAddBookmark}
            folders={this.props.folders}
            selectedValue={this.props.folderId}
          />
        ) : (
          <Box>
            <BoxBody>
              <div className="banner">
                <div className="banner__item banner__item--image banner__item--center">
                  <p>&#x1F605;</p>
                </div>
                <div className="banner__item banner__item--message banner__item--center">
                  <h3>You have no folder to add a bookmark.</h3>
                  <p>Folders are essential for good organization. </p>
                </div>
              </div>
              <div className="banner__item banner__item--button banner__item--center">
                <Link to={`/folder`} className="btn btn--primary">
                  CREATE FOLDER FIRST
                </Link>
              </div>
            </BoxBody>
            <BoxItem alignRight>
              <p className="microcopy">
                -Once you have folders, you will be able to add bookmarks to the
                folders.
              </p>
            </BoxItem>
          </Box>
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
