import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import filteredBookmarksSelector from "../../selectors/filteredBookmarksSelector";
import FolderListFilters from "../folder/FolderListFilters";

import BookmarkList from "../bookmark/BookmarkList";
import Box from "../common/box/Box";
import BoxHeader from "../common/box/BoxHeader";
import BoxBody from "../common/box/BoxBody";
import ButtonList from "../common/button-list/ButtonList";
import BoxItem from "../common/box/BoxItem";
import Banner from "../common/banner/Banner";

export class BookmarkListPage extends React.Component {
  render() {
    return (
      <div className="main">
        {this.props.hasBookmarks.length > 0 && (
          <div className="main__item main__item--header">
            <div className="container">
              <Box>
                <BoxHeader title="All Bookmarks">
                  <ButtonList>
                    <Link className="btn btn--primary" to="/add/bookmark">
                      ADD BOOKMARK
                    </Link>
                  </ButtonList>
                </BoxHeader>
              </Box>
            </div>
          </div>
        )}

        {this.props.hasBookmarks.length > 0 && (
          <div className="main__item main__item--filter">
            <div className="container">
              <Box>
                <BoxItem>
                  <FolderListFilters />
                </BoxItem>
              </Box>
            </div>
          </div>
        )}

        {this.props.bookmarks.length > 0 && (
          <div className="main__item main__item--content">
            <div className="container">
              <Box>
                <BoxBody>
                  <BookmarkList bookmarks={this.props.bookmarks} />
                </BoxBody>
              </Box>
            </div>
          </div>
        )}

        {this.props.hasBookmarks.length > 0 &&
          this.props.bookmarks.length === 0 && (
            <div className="main__item main__item--content">
              <div className="container">
                <Banner
                  title="Can not find what you are looking for..."
                  subtitle="Maybe try another title?"
                  emoji="&#x1F914;"
                  microcopy="-You are searching for titles"
                />
              </div>
            </div>
          )}

        {this.props.folders.length > 0 &&
          this.props.hasBookmarks.length === 0 && (
            <div className="main__item main__item--content">
              <div className="container">
                <Banner
                  title="There is no bookmark to show."
                  subtitle="Do not worry though. You can simply start add"
                  emoji="&#x1F914;"
                />
              </div>
            </div>
          )}

        {this.props.folders.length === 0 && (
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

const mapStateToProps = state => ({
  bookmarks: filteredBookmarksSelector(state.bookmarks, state.filters),
  hasBookmarks: state.bookmarks,
  folders: state.folders
});

export default connect(mapStateToProps)(BookmarkListPage);
