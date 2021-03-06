import React from 'react';
import PropTypes from 'prop-types';
import Folder from './Folder';

const FolderList = ({ folders }) => {
  return (
    <ul className="deep__menu">
      {folders.map((folder) =>
        <Folder key={folder.id} {...folder} />
      )}
    </ul>
  );
};

FolderList.propTypes = {
  folders: PropTypes.array.isRequired
};

export default FolderList;