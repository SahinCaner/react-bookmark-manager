import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import Box from "../common/box/Box";
import BoxHeader from "../common/box/BoxHeader";
import BoxBody from "../common/box/BoxBody";
import BoxItem from "../common/box/BoxItem";
import ButtonList from "../common/button-list/ButtonList";

export default class NewFolderForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      folder: {
        id: props.folder ? props.folder.id : "",
        title: props.folder ? props.folder.title : "",
        desc: props.folder ? props.folder.desc : "",
        createdAt: props.folder ? props.folder.createdAt : 0,
        updatedAt: props.folder ? props.folder.updatedAt : 0
      },
      errors: {},
      saving: false,
      removing: false,
      updating: false
    };
  }

  folderFormIsValid = () => {
    let formIsValid = true;
    let errors = {};

    if (this.state.folder.title === "") {
      errors.title = "You must enter title";
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

  onAddFolder = e => {
    e.preventDefault();
    if (!this.folderFormIsValid()) {
      return;
    }
    this.setState({ saving: true });

    const folder = {
      ...this.state.folder,
      createdAt: Date.now()
    };

    this.setState({ errors: {} });
    this.props.onAddFolder(folder);
  };

  onUpdateFolder = e => {
    e.preventDefault();
    if (!this.folderFormIsValid()) {
      return;
    }

    this.setState({ updating: true });
    const folder = {
      ...this.state.folder,
      updatedAt: Date.now()
    };
    this.setState({ errors: {} });
    this.props.onUpdateFolder(folder);
  };

  onRemovefolder = () => {
    const folder = {
      ...this.state.folder
    };
    this.setState({ removing: true });
    this.props.onRemoveFolder({ id: folder.id });
  };

  render() {
    return (
      <div>
        <div className="main__item main__item--content">
          <div className="container container--small">
            <form>
              <Box>
                {this.props.onAddFolder ? (
                  <BoxHeader title="Create Folder" />
                ) : (
                  <BoxHeader title="Edit Folder" />
                )}
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
                <BoxItem buttons>
                  {this.props.onAddFolder ? (
                    <ButtonList>
                      <button
                        type="submit"
                        disabled={this.state.saving}
                        className="btn btn--primary"
                        onClick={this.onAddFolder}
                      >
                        {this.state.saving ? "CREATING..." : "CREATE FOLDER"}
                      </button>
                      <Link to="/folders" className="btn btn--link">
                        CANCEL
                      </Link>
                    </ButtonList>
                  ) : (
                    <ButtonList>
                      <button
                        type="submit"
                        disabled={this.state.updating}
                        className="btn btn--primary"
                        onClick={this.onUpdateFolder}
                      >
                        {this.state.updating ? "SAVING..." : "SAVE"}
                      </button>
                      <Link
                        to={`/folder/${this.state.folder.id}`}
                        className="btn btn--link"
                      >
                        CANCEL
                      </Link>
                    </ButtonList>
                  )}
                </BoxItem>
              </Box>
            </form>
          </div>
        </div>
        {!this.props.onAddFolder && (
          <div className="main__item main__item--footer">
            <div className="container container--small">
              <Box>
                <BoxItem alignRight transparent>
                  <button
                    type="submit"
                    disabled={this.state.removing}
                    className="btn btn--link btn--justlink"
                    onClick={this.onRemovefolder}
                  >
                    <i className="fa fa-trash" />
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
