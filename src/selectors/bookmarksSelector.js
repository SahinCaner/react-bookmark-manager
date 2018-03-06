const selectBookmarks = (bookmarks = [], folderId) => {
  return bookmarks.filter((bookmark) => {
    if (bookmark.folderId === folderId) {
      return bookmark
    }
  });
}

export default selectBookmarks;
