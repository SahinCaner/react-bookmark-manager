import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Bookmark = ({ id, title, href, folderId, createdAt, iconURL }) => {
  return (
    <li>
      <Link to={`/bookmark/${id}`}>{title}</Link>
    </li>
  )
}

Bookmark.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  folderId: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  iconURL: PropTypes.string.isRequired
};

export default Bookmark;
