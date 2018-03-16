import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import Box from "../common/box/Box";
import BoxHeader from "../common/box/BoxHeader";
import BoxBody from "../common/box/BoxBody";
import ButtonList from "../common/button-list/ButtonList";
import BoxItem from "../common/box/BoxItem";

const FolderForm = ({ folder, onSave, onChange, saving, errors }) => {
  return (
    <form>
      {folder.id ? (
        <div className="container">
          <Box>
            <BoxHeader title={folder.title} desc={folder.desc}>
              <ButtonList>
                <Link
                  to={`/update/folder/${folder.id}`}
                  className="btn btn--link"
                >
                  UPDATE
                </Link>
                <Link
                  to={`/bookmark/folder/${folder.id}`}
                  className="btn btn--primary"
                >
                  ADD BOOKMARK
                </Link>
              </ButtonList>
            </BoxHeader>
          </Box>
        </div>
      ) : (
        <div className="container container--small">
          <Box>
            <BoxHeader title="Create New Folder" />
            <BoxBody>
              <TextInput
                name="title"
                label="FOLDER TITLE"
                value={folder.title}
                onChange={onChange}
                error={errors.title}
                placeholder="Enter folder title."
              />
              <TextInput
                name="desc"
                label="FOLDER DESCRIPTION"
                value={folder.desc}
                onChange={onChange}
                placeholder="Folder description is optional."
              />
            </BoxBody>
            <BoxItem buttons>
              <ButtonList>
                <input
                  type="submit"
                  disabled={saving}
                  value={saving ? "SAVING..." : "CREATE FOLDER"}
                  className="btn btn--primary"
                  onClick={onSave}
                />
                <Link to="/" className="btn btn--link">
                  CANCEL
                </Link>
              </ButtonList>
            </BoxItem>
          </Box>
        </div>
      )}
    </form>
  );
};

FolderForm.propTypes = {
  folder: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default FolderForm;
