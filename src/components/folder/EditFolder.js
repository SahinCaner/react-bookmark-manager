import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import toastr from "toastr";

import { startFindFolderBookmarks } from "../../actions/bookmarkActions";
import {
  startUpdateFolder,
  startRemoveFolder
} from "../../actions/folderActions";
import FolderForm from "./FolderForm";

export class EditFolder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      folder: { ...this.props.folder },
      errors: {}
    };
  }

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

  updateFolderState = e => {
    const field = e.target.name;
    let folder = { ...this.state.folder };
    folder[field] = e.target.value;
    return this.setState({ folder });
  };

  onRemoveFolder = ({id}) => {
    this.props.startFindFolderBookmarks(id).then(() => {
      this.props.history.push("/folders");
      toastr.success("Folder removed.");
    });
  };

  onUpdateFolder = folder => {
    this.props.startUpdateFolder(this.props.folder.id, folder).then(() => {
      this.props.history.push(`/folder/${this.props.folder.id}`);
      toastr.success("Folder edited.");
    });
  };

  render() {
    return (
      <div className="main">
        <FolderForm
          folder={this.props.folder}
          onUpdateFolder={this.onUpdateFolder}
          onRemoveFolder={this.onRemoveFolder}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  folder: state.folders.find(folder => folder.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startUpdateFolder: (id, folder) => dispatch(startUpdateFolder(id, folder)),
  startFindFolderBookmarks: id => dispatch(startFindFolderBookmarks(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditFolder);
