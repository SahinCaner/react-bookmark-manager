import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const BookmarkForm = ({ bookmark, allFolders, onSave, onUpdate, onChange, onRemove, saving, updating, removing, errors }) => {
  return (
    <form>
      <TextInput
        name="title"
        label="Bookmark Title"
        value={bookmark.title}
        onChange={onChange}
        error={errors.name}
      />

      <TextInput
        name="href"
        label="Bookmark Link"
        value={bookmark.href}
        onChange={onChange}
        error={errors.name}
      />

      <SelectInput
        name="folderId"
        label="Folder"
        value={bookmark.folderId}
        defaultOption="Select Folder"
        options={allFolders}
        onChange={onChange}
        error={errors.folderId} />

      {bookmark.id
        ? <div>
          <input
            type="submit"
            disabled={updating}
            value={updating ? 'Updating...' : 'Update'}
            className="btn btn-primary"
            onClick={onUpdate} />
          <input
            type="submit"
            disabled={removing}
            value={removing ? 'Removing...' : 'Remove'}
            className="btn btn-primary"
            onClick={onRemove} />
        </div>
        : <input
          type="submit"
          disabled={saving}
          value={saving ? 'Saving...' : 'Save'}
          className="btn btn-primary"
          onClick={onSave} />}
    </form>
  )
}

BookmarkForm.PropTypes = {
  bookmark: PropTypes.object.isRequired,
  allFolders: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  updating: PropTypes.bool,
  removing: PropTypes.bool,
  errors: PropTypes.object
}

export default BookmarkForm;
