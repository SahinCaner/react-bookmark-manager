import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// const Bookmark = (childBookmarks) => (
//   <li>
//     <Link to={`/`}>{childBookmarks}</Link>
//   </li>
// );

const Bookmark = (props) => {
  console.log(props.childBookmarks);
  return {}
}


// Bookmark.propTypes = {
//   id: PropTypes.string.isRequired,
//   bookmarkName: PropTypes.string.isRequired,
//   bookmarkLink: PropTypes.string.isRequired,
// };

export default Bookmark;
