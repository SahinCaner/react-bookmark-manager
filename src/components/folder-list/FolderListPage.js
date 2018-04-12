import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import selectBookmarks from "../../selectors/bookmarksSelector";

import Box from "../common/box/Box";
import BoxHeader from "../common/box/BoxHeader";
import BoxBody from "../common/box/BoxBody";
import ButtonList from "../common/button-list/ButtonList";
import BoxItem from "../common/box/BoxItem";

import FolderList from "./FolderList";
import Banner from "../common/banner/Banner";

export class FolderListPage extends React.Component {
  render() {
    return (
      <div className="main">
        {this.props.folders.length > 0 && (
          <div>
            <div className="main__item main__item--header">
              <div className="container">
                <Box>
                  <BoxHeader title="Folders">
                    <ButtonList>
                      <Link className="btn btn--primary" to="/add/folder">
                        CREATE FOLDER
                      </Link>
                    </ButtonList>
                  </BoxHeader>
                </Box>
              </div>
            </div>
            <div className="main__item main__item--content">
              <div className="container">
                <Box>
                  <BoxItem>
                    <FolderList
                      folders={this.props.folders}
                      bookmarks={this.props.bookmarks}
                    />
                  </BoxItem>
                </Box>
              </div>
            </div>
          </div>
        )}

        {this.props.folders.length === 0 && (
          <div className="main__item main__item--content">
            <div className="container">
              <Banner
                title="Let's create folder now."
                subtitle="Folders are essential for good organization."
                microcopy="-Once you have folders, you will be able to add bookmarks to
                  the folders."
                emoji="&#x1F60D;"
              >
                <Link to="/add/folder" className="btn btn--primary">
                  CREATE FOLDER
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
  folders: state.folders,
  bookmarks: state.bookmarks
});

export default connect(mapStateToProps)(FolderListPage);
