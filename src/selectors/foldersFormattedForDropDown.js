const foldersFormattedForDropDown = (folders) => {
  return folders.map(folder => {
    return {
      value: folder.id,
      text: folder.title
    };
  });
}

export default foldersFormattedForDropDown;