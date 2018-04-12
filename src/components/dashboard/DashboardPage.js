import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FolderList from "../folder-list/FolderList";
import Box from "../common/box/Box";
import BoxHeader from "../common/box/BoxHeader";
import BoxBody from "../common/box/BoxBody";
import Banner from "../common/banner/Banner";

export class Dashboard extends Component {
  render() {
    return (
      <div className="main">
        <Banner
          title="Let's create folder now."
          subtitle="Folders are essential for good organization."
          microcopy="-Once you have folders, you will be able to add bookmarks to
                  the folders."
          emoji="&#x1F60D;"
        >
          <Link to={`/add/folder`} className="btn btn--primary">
            CREATE FOLDER FIRST
          </Link>
        </Banner>
      </div>
    );
  }
}

Dashboard.propTypes = {
  folders: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    folders: state.folders,
    bookmarks: state.bookmarks
  };
}

export default connect(mapStateToProps)(Dashboard);
