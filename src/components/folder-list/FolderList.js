import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import selectBookmarks from "../../selectors/bookmarksSelector";
import Box from "../common/box/Box";
import BoxHeader from "../common/box/BoxHeader";
import BoxBody from "../common/box/BoxBody";
import ButtonList from "../common/button-list/ButtonList";
import BoxItem from "../common/box/BoxItem";

const FolderList = ({ folders, bookmarks }) => {
  return (
    <ul className="folder__list">
      {folders.map(folder => {
        const bookmarkList = selectBookmarks(bookmarks, folder.id);
        return (
          <li key={folder.id}>
            <Link to={`/folder/${folder.id}`}>
              <div className="folder__images">
                <ul className={`folder__image__list`}>
                  {bookmarkList.map(bookmark => {
                    return (
                      <li key={bookmark.id}>
                        <img src={bookmark.iconURL} alt="" />
                      </li>
                    );
                  })}
                </ul>
              </div>
              <p>{folder.title}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

FolderList.propTypes = {
  folders: PropTypes.array.isRequired,
  bookmarks: PropTypes.array.isRequired
};

export default FolderList;
