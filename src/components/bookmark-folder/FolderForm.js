import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const FolderForm = ({ folder, onSave, onChange, onUpdate, saving, updating, errors }) => {
  return (
    <form>
      <TextInput
        name="title"
        label="Folder Title"
        value={folder.title}
        onChange={onChange}
        error={errors.name}
      />

      <TextInput
        name="desc"
        label="Folder Description"
        value={folder.desc}
        onChange={onChange}
        error={errors.name}
      />
      {folder.id
        ? <input
          type="submit"
          disabled={updating}
          value={updating ? 'Updating...' : 'Update'}
          className="btn btn-primary"
          onClick={onUpdate} />
        : <input
          type="submit"
          disabled={saving}
          value={saving ? 'Saving...' : 'Save'}
          className="btn btn-primary"
          onClick={onSave} />
      }
    </form>
  )
}

FolderForm.PropTypes = {
  folder: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  updating: PropTypes.bool,
  errors: PropTypes.object
}

export default FolderForm;
