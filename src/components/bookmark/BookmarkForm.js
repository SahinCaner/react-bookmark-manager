import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import Box from "../common/box/Box";
import BoxHeader from "../common/box/BoxHeader";
import BoxBody from "../common/box/BoxBody";
import BoxItem from "../common/box/BoxItem";
import ButtonList from "../common/button-list/ButtonList";

const BookmarkForm = ({
  bookmark,
  allFolders,
  onSave,
  onUpdate,
  onChange,
  onRemove,
  saving,
  updating,
  removing,
  errors,
  selectedFolderId
}) => {
  return (
    <form>
      <div className="main__item main__item--content">
        {/* If user does not have any folder, show user the add folder option */}
        {/* If user has folders then show user to folders in select */}
        {allFolders.length === 0 ? (
          <div className="container">
            <Box>
              <BoxBody>
                <div className="banner">
                  <div className="banner__item banner__item--image banner__item--center">
                    <p>&#x1F605;</p>
                  </div>
                  <div className="banner__item banner__item--message banner__item--center">
                    <h3>You have no folder to add a bookmark.</h3>
                    <p>Folders are essential for good organization. </p>
                  </div>
                </div>
                <div className="banner__item banner__item--button banner__item--center">
                  <Link to={`/folder`} className="btn btn--primary">
                    CREATE FOLDER FIRST
                  </Link>
                </div>
              </BoxBody>
              <BoxItem alignRight>
                <p className="microcopy">
                  -Once you have folders, you will be able to add bookmarks to
                  the folders.
                </p>
              </BoxItem>
            </Box>
          </div>
        ) : (
          <div className="container container--small">
            <Box>
              {selectedFolderId ? (
                <BoxHeader title="Update Bookmark" />
              ) : (
                <BoxHeader title="Add Bookmark" />
              )}
              <BoxBody>
                <TextInput
                  name="title"
                  label="BOOKMARK TITLE"
                  value={bookmark.title}
                  onChange={onChange}
                  error={errors.title}
                  placeholder="Enter a title for bookmark."
                />
                <TextInput
                  name="href"
                  label="BOOKMARK LINK"
                  value={bookmark.href}
                  onChange={onChange}
                  error={errors.href}
                  placeholder="Copy the link from the browser and paste it here!"
                />
                <SelectInput
                  name="folderId"
                  label="SELECT A FOLDER"
                  value={bookmark.folderId}
                  defaultOption="Select Folder"
                  selectedValue={selectedFolderId}
                  options={allFolders}
                  onChange={onChange}
                  error={errors.folderId}
                />
              </BoxBody>
            </Box>
            {/* If bookmark exists show update option */}
            {/* If there is bookmark, show create bookmark */}
            {bookmark.id ? (
              <Box>
                <BoxItem buttons>
                  <ButtonList>
                    <button
                      type="submit"
                      disabled={updating}
                      className="btn btn--primary"
                      onClick={onUpdate}
                    >
                      {updating ? "UPDATING..." : "UPDATE BOOKMARK"}
                    </button>
                    <Link
                      to={`/folder/${selectedFolderId}`}
                      className="btn btn--link"
                    >
                      CANCEL
                    </Link>
                  </ButtonList>
                </BoxItem>
              </Box>
            ) : (
              <Box>
                <BoxItem buttons>
                  <ButtonList>
                    <button
                      type="submit"
                      disabled={saving}
                      className="btn btn--primary"
                      onClick={onSave}
                    >
                      {saving ? "ADDING..." : "ADD BOOKMARK"}
                    </button>
                    <Link to="/" className="btn btn--link">
                      CANCEL
                    </Link>
                  </ButtonList>
                </BoxItem>
              </Box>
            )}
          </div>
        )}
      </div>

      {bookmark.id && (
        <div className="main__item main__item--content">
          <div className="container container--small">
            <Box>
              <BoxItem alignRight>
                <input
                  type="submit"
                  disabled={removing}
                  value={removing ? "REMOVING..." : "REMOVE BOOKMARK"}
                  className="btn btn--link btn--justlink"
                  onClick={onRemove}
                />
              </BoxItem>
            </Box>
          </div>
        </div>
      )}
    </form>
  );
};

BookmarkForm.propTypes = {
  bookmark: PropTypes.object.isRequired,
  allFolders: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  updating: PropTypes.bool,
  removing: PropTypes.bool,
  errors: PropTypes.object,
  selectedFolderId: PropTypes.string
};

export default BookmarkForm;
