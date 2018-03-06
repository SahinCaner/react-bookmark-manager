import React from 'react';
import PropTypes from 'prop-types';
import Bookmark from './Bookmark';

const BookmarkList = ({bookmarks}) => {
  console.log(bookmarks);
  return (
    <ul>
      {
        bookmarks.map((bookmark) => 
          <Bookmark key={bookmark.id} childBookmarks={bookmark}/>
        )
      }
    </ul>
  )
}

BookmarkList.propTypes = {
  bookmarks: PropTypes.array.isRequired
};

export default BookmarkList;