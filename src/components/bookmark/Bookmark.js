import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";

const Bookmark = ({ id, title, href, folderId, createdAt, iconURL }) => {
  return (
    <li>
      <div className="bookmark bookmark--link">
        <Link to={href} target="_blank">
          <div className="bookmark__image">
            <img src={`${iconURL}`} alt="" />
          </div>
          <div className="bookmark__link">{title}</div>
        </Link>
      </div>
      <div className="bookmark bookmark--update">
        <Link to={`/edit/bookmark/${id}`}> EDIT </Link>
      </div>
    </li>
  );
};

Bookmark.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  folderId: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  iconURL: PropTypes.string.isRequired
};

export default Bookmark;
