import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import toastr from "toastr";
import FolderForm from "./FolderForm";
import {
  startCreateFolder,
  startUpdateFolder,
  startRemoveFolder
} from "../../actions/folderActions";
import { startFindFolderBookmarks } from "../../actions/bookmarkActions";
import BookmarkList from "../bookmark/BookmarkList";
import selectBookmarks from "../../selectors/bookmarksSelector";
import filteredBookmarksSelector from "../../selectors/filteredBookmarksSelector";
import Box from "../common/box/Box";
import BoxHeader from "../common/box/BoxHeader";
import BoxBody from "../common/box/BoxBody";
import ButtonList from "../common/button-list/ButtonList";
import BoxItem from "../common/box/BoxItem";
import FolderFilterList from "./FolderListFilters";

export class ManageFolder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      folder: Object.assign({}, this.props.folder),
      errors: {},
      saving: false,
      removing: false
    };
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.folder.id !== nextProps.folder.id) {
      // Necessary to populate form when existing folder is loaded directly.
      this.setState({ folder: Object.assign({}, nextProps.folder) });
    }
    if (this.props.folder.title !== nextProps.folder.title) {
      this.setState({ folder: Object.assign({}, nextProps.folder) });
    }
    if (this.props.folder.desc !== nextProps.folder.desc) {
      this.setState({ folder: Object.assign({}, nextProps.folder) });
    }
  };

  updateFolderState = e => {
    const field = e.target.name;
    let folder = Object.assign({}, this.state.folder);
    folder[field] = e.target.value;
    return this.setState({ folder: folder });
  };

  folderFormIsValid = () => {
    let formIsValid = true;
    let errors = {};

    if (this.state.folder.title.length === 0) {
      errors.title = "You must enter title for folder.";
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  };

  removeFolder = e => {
    e.preventDefault();
    this.props.startFindFolderBookmarks(this.props.folder.id);
    //this.props.startRemoveFolder({ id: this.props.folder.id });
    this.props.history.push("/");
  };

  saveFolder = e => {
    e.preventDefault();

    if (!this.folderFormIsValid()) {
      return;
    }

    this.setState({ saving: true });
    this.props.startCreateFolder(this.state.folder).then(folderId => {
      this.props.history.push(`/folder/${folderId}`);
    });
  };

  render() {
    return (
      <div className="main">
        <div className="main__item main__item--header">
          <FolderForm
            folder={this.state.folder}
            onChange={this.updateFolderState}
            onSave={this.saveFolder}
            onRemove={this.removeFolder}
            errors={this.state.errors}
            saving={this.state.saving}
          />
        </div>

        {/* If folder has bookmarks show filters */}
        {this.props.hasBookmarks.length > 0 && (
          <div className="main__item main__item--filter">
            <div className="container">
              <Box>
                <BoxItem>
                  <FolderFilterList />
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
                <Box>
                  <BoxHeader />
                  <BoxBody>
                    <div className="banner">
                      <div className="banner__item banner__item--image banner__item--center">
                        <p>&#x1F914;</p>
                      </div>
                      <div className="banner__item banner__item--message banner__item--center">
                        <h3>
                          Hmmm... We can not find what you are searching for.
                        </h3>
                        <p>Maybe try another keyword?</p>
                      </div>
                    </div>
                  </BoxBody>
                </Box>
              </div>
            </div>
          )}

        {/* If Folder is just cretead and has no bookmarks */}
        {this.props.folder.id &&
          this.props.hasBookmarks.length === 0 && (
            <div className="main__item main__item--content">
              <div className="container">
                <Box>
                  <BoxHeader />
                  <BoxBody>
                    <div className="banner">
                      <div className="banner__item banner__item--image banner__item--center">
                        {/* <p>&#x1F917;</p> */}
                        <p>&#x1F389;</p>
                      </div>
                      <div className="banner__item banner__item--message banner__item--center">
                        <h3>This folder is ready to rock!</h3>
                        {/* <h3>You have created a folder & you are awesome!</h3> */}
                        <p>
                          Now it is time to add some bookmarks to this folder.
                        </p>
                      </div>
                    </div>
                    <div className="banner__item banner__item--button banner__item--center">
                      <Link
                        to={`/add/bookmark/${this.state.folder.id}`}
                        className="btn btn--primary"
                      >
                        ADD BOOKMARK
                      </Link>
                    </div>
                  </BoxBody>
                  <BoxItem alignRight>
                    <p className="microcopy">
                      -When you add bookmarks, they will appear here.
                    </p>
                  </BoxItem>
                </Box>
              </div>
            </div>
          )}

        {/* Remove Folder */}
        {this.props.folder.id && (
          <div className="main__item main__item--content">
            <div className="container">
              <Box>
                <BoxItem alignRight>
                  <button
                    type="submit"
                    disabled={this.state.removing}
                    className="btn btn--link btn--justlink"
                    onClick={this.removeFolder}
                  >
                    <i className="fa fa-trash" />{" "}
                    {this.state.removing ? "REMOVING..." : "REMOVE FOLDER"}
                  </button>
                </BoxItem>
              </Box>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ManageFolder.propTypes = {
  bookmarks: PropTypes.array.isRequired,
  folder: PropTypes.object.isRequired,
  startCreateFolder: PropTypes.func.isRequired,
  startFindFolderBookmarks: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const getFolderById = (folders, id) => {
  const folder = folders.filter(folder => folder.id == id);
  if (folder) return folder[0]; //since filter returns an array, have to grab the first.
  return null;
};

const mapStateToProps = (state, ownProps) => {
  const folderId = ownProps.match.params.id; // from the path `/folder/:id`

  let folder = {
    id: "",
    title: "",
    desc: "",
    bookmarks: {},
    createdAt: Date.now(),
    updatedAt: 0
  };

  if (folderId && state.folders.length > 0) {
    folder = getFolderById(state.folders, folderId);
  }

  return {
    folder: folder,
    bookmarks: filteredBookmarksSelector(
      selectBookmarks(state.bookmarks, folderId),
      state.filters
    ),
    hasBookmarks: selectBookmarks(state.bookmarks, folderId)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startCreateFolder: folder => dispatch(startCreateFolder(folder)),
    startRemoveFolder: id => dispatch(startRemoveFolder(id)),
    startFindFolderBookmarks: id => dispatch(startFindFolderBookmarks(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageFolder);
