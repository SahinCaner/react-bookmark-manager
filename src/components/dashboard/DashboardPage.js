import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FolderList from "../bookmark-folder/FolderList";
import Box from "../common/box/Box";
import BoxHeader from "../common/box/BoxHeader";
import BoxBody from "../common/box/BoxBody";

export class Dashboard extends Component {
  render() {
    return (
      <div className="main">
        <div className="main__item">
          <div className="container">
            <Box>
              <BoxHeader title="Folders" />
              <BoxBody>
                <FolderList folders={this.props.folders} />
              </BoxBody>
            </Box>
          </div>
        </div>
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

{
  /* <div className="main__item main__item--content">
        <div className="flex__container">
          <div className="flex__column flex__column--main">
            <div className="card">
              <div className="card__item card__item--header">
                <h2>Folders</h2>
              </div>
              <div className="card__item card__item--content">
                
              </div>
            </div>
          </div>
        </div>
      </div> */
}
