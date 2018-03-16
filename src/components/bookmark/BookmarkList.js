import React from 'react';
import PropTypes from 'prop-types';
import Bookmark from './Bookmark';

const BookmarkList = ({ bookmarks }) => {
  return (
    <ul className="bookmark__list">
      {bookmarks.map((bookmark) =>
        <Bookmark key={bookmark.id} {...bookmark} />
      )}
    </ul>
  );
};

BookmarkList.propTypes = {
  bookmarks: PropTypes.array.isRequired
};

export default BookmarkList;