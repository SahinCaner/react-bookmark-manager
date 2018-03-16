import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Folder = ({ id, title, desc, createdAt, iconURL }) => (
  <li>
    <Link to={`/folder/${id}`}>
      <div className="deep__menu__item--icon">
        <img src="/images/folder.svg" alt=""/>
      </div>
      {title}
    </Link>
  </li>
);

Folder.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  iconURL: PropTypes.string.isRequired
};

export default Folder;
