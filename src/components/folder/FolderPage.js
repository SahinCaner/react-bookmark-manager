import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import selectBookmarks from "../../selectors/bookmarksSelector";
import filteredBookmarksSelector from "../../selectors/filteredBookmarksSelector";

import BookmarkList from "../bookmark/BookmarkList";
import FolderListFilters from "./FolderListFilters";

import Box from "../common/box/Box";
import BoxHeader from "../common/box/BoxHeader";
import BoxBody from "../common/box/BoxBody";
import ButtonList from "../common/button-list/ButtonList";
import BoxItem from "../common/box/BoxItem";
import Banner from "../common/banner/Banner";

export class FolderPage extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="main__item main__item--header">
          <div className="container">
            <Box>
              <BoxHeader
                title={this.props.folder.title}
                desc={this.props.folder.desc}
              >
                <ButtonList>
                  <Link
                    to={`/edit/folder/${this.props.folder.id}`}
                    className="btn btn--link"
                  >
                    EDIT
                  </Link>
                  <Link
                    to={`/add/bookmark/${this.props.folder.id}`}
                    className="btn btn--primary"
                  >
                    ADD BOOKMARK
                  </Link>
                </ButtonList>
              </BoxHeader>
            </Box>
          </div>
        </div>

        {/* If folder has bookmarks show filters */}
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

        {/* If Folder already have Bookmarks */}
        {this.props.bookmarks.length > 0 && (
          <div className="main__item main__item--content">
            <div className="container">
              <Box>
                <BoxBody>
                  <BookmarkList bookmarks={this.props.bookmarks} />
                </BoxBody>
                <div className="box__item box__item-position box__item-position--right">
                  <p className="microcopy">
                    You have {this.props.hasBookmarks.length} bookmarks in this
                    folder.
                  </p>
                </div>
              </Box>
            </div>
          </div>
        )}

        {/* If Folder is just cretead and has no bookmarks */}
        {this.props.hasBookmarks.length > 0 &&
          this.props.bookmarks.length === 0 && (
            <div className="main__item main__item--content">
              <div className="container">
                <Banner
                  title="Hmmm... We can not find what you are searching for."
                  subtitle="Maybe try another keyword?"
                  emoji="&#x1F914;"
                  microcopy="-Try harder."
                />
              </div>
            </div>
          )}

        {/* If Folder is just cretead and has no bookmarks */}
        {this.props.folder.id &&
          this.props.hasBookmarks.length === 0 && (
            <div className="main__item main__item--content">
              <div className="container">
                <Banner
                  title="This folder is ready to rock!"
                  subtitle="Now it is time to add some bookmarks to this folder."
                  microcopy="-When you add bookmarks, they will appear here."
                  emoji="&#x1F389;"
                >
                  <Link
                    to={`/add/bookmark/${this.props.folder.id}`}
                    className="btn btn--primary"
                  >
                    ADD BOOKMARK
                  </Link>
                </Banner>
              </div>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  folder: state.folders.find(folder => folder.id === props.match.params.id),
  bookmarks: filteredBookmarksSelector(
    selectBookmarks(state.bookmarks, props.match.params.id),
    state.filters
  ),
  hasBookmarks: selectBookmarks(state.bookmarks, props.match.params.id)
});

const mapDispatchToProps = dispatch => {
  return {
    startCreateFolder: folder => dispatch(startCreateFolder(folder)),
    startRemoveFolder: id => dispatch(startRemoveFolder(id)),
    startFindFolderBookmarks: id => dispatch(startFindFolderBookmarks(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FolderPage);
