const findBookmarksForFolder = (folder, bookmarks) => {
  return bookmarks.map((bookmark) => {
    if (bookmark.folderId === folder.id) {
      return bookmark.title;
    }
  })
}
export default findBookmarksForFolder;