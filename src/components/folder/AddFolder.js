import React from "react";
import { connect } from "react-redux";
import toastr from "toastr";

import FolderForm from "./FolderForm";
import { startCreateFolder } from "../../actions/folderActions";

export class AddFolder extends React.Component {
  onAddFolder = folder => {
    this.props.startCreateFolder(folder).then(folderId => {
      this.props.history.push(`/folder/${folderId}`);
      toastr.success("Folder created.");
    });
  };

  render() {
    return (
      <div className="main">
        <FolderForm onAddFolder={this.onAddFolder} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startCreateFolder: folder => dispatch(startCreateFolder(folder))
  };
};

export default connect(undefined, mapDispatchToProps)(AddFolder);
