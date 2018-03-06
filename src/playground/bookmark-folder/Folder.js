import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Folder = ({id, folderName}) => (
  <li>
    <Link to={`/folder/${id}`}>{folderName}</Link>
  </li>
);

Folder.propTypes = {
  id: PropTypes.string.isRequired,
  folderName: PropTypes.string.isRequired
};

export default Folder;
