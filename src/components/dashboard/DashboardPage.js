import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FolderList from "../folder-list/FolderList";
import Box from "../common/box/Box";
import BoxHeader from "../common/box/BoxHeader";
import BoxBody from "../common/box/BoxBody";

export class Dashboard extends Component {
  render() {
    return (
      <div className="main">
        <p>caner
        </p>
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