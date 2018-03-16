import moment from "moment";

export default (
  bookmarks,
  { text, sortBy }
) => {
  return bookmarks
    .filter(bookmark => {
      const textMatch = bookmark.title
        .toLowerCase()
        .includes(text.toLowerCase());
      return textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "createdAt") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "updatedAt") {
        return a.updatedAt < b.updatedAt ? 1 : -1;
      } else if (sortBy === "title") {
        return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
      } else {
        return a.createdAt < b.createdAt ? 1 : -1;
      }
    });
};
