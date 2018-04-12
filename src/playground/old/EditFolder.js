import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import {
  startUpdateFolder,
  startRemoveFolder
} from "../../actions/folderActions";
import Box from "../common/box/Box";
import BoxHeader from "../common/box/BoxHeader";
import BoxBody from "../common/box/BoxBody";
import ButtonList from "../common/button-list/ButtonList";
import BoxItem from "../common/box/BoxItem";

export class EditFolder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      folder: Object.assign({}, this.props.folder),
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
    let folder = Object.assign({}, this.state.folder);
    folder[field] = e.target.value;
    return this.setState({ folder: folder });
  };

  onUpdateFolder = e => {
    e.preventDefault();
    if (!this.folderFormIsValid()) {
      return;
    }

    // We don't want to change state directly
    // https://medium.freecodecamp.org/handling-state-in-react-four-immutable-approaches-to-consider-d1f5c00249d5
    const folder = { ...this.state.folder, updatedAt: Date.now() };
    this.props.startUpdateFolder(this.props.folder.id, folder);
    this.props.history.push(`/folder/${this.props.folder.id}`);
  };

  render() {
    return (
      <div className="main">
        <form>
          <div className="main__item">
            <div className="container container--small">
              <Box>
                <BoxHeader title="Update Folder" />
                <BoxBody>
                  <TextInput
                    name="title"
                    label="FOLDER TITLE"
                    value={this.state.folder.title}
                    onChange={this.updateFolderState}
                    error={this.state.errors.title}
                    placeholder="Enter folder title."
                  />
                  <TextInput
                    name="desc"
                    label="FOLDER DESCRIPTION"
                    value={this.state.folder.desc}
                    onChange={this.updateFolderState}
                    placeholder="Folder description is optional."
                  />
                </BoxBody>
              </Box>
              <Box>
                <BoxItem buttons>
                  <ButtonList>
                    <input
                      type="submit"
                      value="UPDATE FOLDER"
                      className="btn btn--primary"
                      onClick={this.onUpdateFolder}
                    />
                    <Link
                      to={`/folder/${this.state.folder.id}`}
                      className="btn btn--link"
                    >
                      CANCEL
                    </Link>
                  </ButtonList>
                </BoxItem>
              </Box>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  folder: state.folders.find(folder => folder.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startUpdateFolder: (id, folder) => dispatch(startUpdateFolder(id, folder))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditFolder);
