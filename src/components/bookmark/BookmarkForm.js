import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import Box from "../common/box/Box";
import BoxHeader from "../common/box/BoxHeader";
import BoxBody from "../common/box/BoxBody";
import BoxItem from "../common/box/BoxItem";
import ButtonList from "../common/button-list/ButtonList";

export class BookmarkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmark: {
        title: props.bookmark ? props.bookmark.title : "",
        href: props.bookmark ? props.bookmark.href : "",
        createdAt: props.bookmark ? props.bookmark.createdAt : 0,
        updatedAt: props.bookmark ? props.bookmark.updatedAt : 0,
        iconURL: props.bookmark
          ? "http://s2.googleusercontent.com/s2/favicons?domain_url=" +
            this.props.bookmark.href
          : "",
        folderId: this.props.selectedValue ? this.props.selectedValue : ""
      },
      errors: {},
      updating: false,
      removing: false,
      saving: false
    };
  }

  addHTTP(url) {
    if (!/^(f|ht)tps?:\/\//i.test(url)) {
      url = "http://" + url;
    }
    return url;
  }

  validateURL(url) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      url
    );
  }

  bookmarkFormIsValid = () => {
    let formIsValid = true;
    let errors = {};

    if (this.state.bookmark.title === "") {
      errors.title = "You must enter title";
      formIsValid = false;
    }

    if (this.state.bookmark.href === "") {
      errors.href = "You must enter URL";
      formIsValid = false;
    }

    if (this.validateURL(this.addHTTP(this.state.bookmark.href)) !== true) {
      errors.href = "You must enter valid URL";
      formIsValid = false;
    }

    if (this.state.bookmark.folderId === "") {
      errors.folderId = "You must select bookmark folder";
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  };

  updateBookmarkState = e => {
    const field = e.target.name;
    let bookmark = Object.assign({}, this.state.bookmark);
    bookmark[field] = e.target.value;
    return this.setState({ bookmark: bookmark });
  };

  onUpdateBookmark = e => {
    e.preventDefault();
    if (!this.bookmarkFormIsValid()) {
      return;
    }

    this.setState({ updating: true });

    const bookmark = {
      ...this.state.bookmark,
      updatedAt: Date.now(),
      iconURL:
        "http://s2.googleusercontent.com/s2/favicons?domain_url=" +
        this.state.bookmark.href,
      href: this.addHTTP(this.state.bookmark.href)
    };
    this.setState({ errors: {} });
    this.props.onUpdateBookmark(bookmark);
  };

  onAddBookmark = e => {
    e.preventDefault();
    if (!this.bookmarkFormIsValid()) {
      return;
    }

    this.setState({ saving: true });

    let bookmark = {
      ...this.state.bookmark,
      createdAt: Date.now(),
      iconURL:
        "http://s2.googleusercontent.com/s2/favicons?domain_url=" +
        this.state.bookmark.href,
      href: this.addHTTP(this.state.bookmark.href)
    };

    this.setState({ errors: {} });
    this.props.onAddBookmark(bookmark);
  };

  onRemoveBookmark = () => {
    const bookmark = {
      ...this.state.bookmark
    };
    this.setState({ removing: true });
    this.props.onRemoveBookmark(bookmark);
  };

  render() {
    return (
      <div>
        <div className="main__item main__item--content">
          <div className="container container--small">
            <form>
              <Box>
                {this.props.onAddBookmark ? (
                  <BoxHeader title="Add Bookmark" />
                ) : (
                  <BoxHeader title="Edit Bookmark" />
                )}
                <BoxBody>
                  <TextInput
                    name="title"
                    label="BOOKMARK TITLE"
                    value={this.state.bookmark.title}
                    onChange={this.updateBookmarkState}
                    error={this.state.errors.title}
                    placeholder="Enter a title for bookmark."
                  />
                  <TextInput
                    name="href"
                    label="BOOKMARK LINK"
                    value={this.state.bookmark.href}
                    onChange={this.updateBookmarkState}
                    error={this.state.errors.href}
                    placeholder="Copy the link from the browser and paste it here!"
                  />
                  <SelectInput
                    name="folderId"
                    label="SELECT A FOLDER"
                    value={this.state.bookmark.folderId}
                    defaultOption="Select Folder"
                    selectedValue={this.state.bookmark.folderId}
                    options={this.props.folders}
                    onChange={this.updateBookmarkState}
                    error={this.state.errors.folderId}
                  />
                </BoxBody>
              </Box>
              <Box>
                <BoxItem buttons>
                  <ButtonList>
                    {this.props.onAddBookmark ? (
                      <button
                        type="submit"
                        disabled={this.state.saving}
                        className="btn btn--primary"
                        onClick={this.onAddBookmark}
                      >
                        {this.state.saving ? "ADDING..." : "ADD BOOKMARK"}
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={this.state.updating}
                        className="btn btn--primary"
                        onClick={this.onUpdateBookmark}
                      >
                        {this.state.updating
                          ? "SAVING..."
                          : "SAVE"}
                      </button>
                    )}
                    {/* if user add bookmark to existing folder on cancel return to folder */}
                    {/* or go back to dashboard */}
                    {this.state.bookmark.folderId ? (
                      <Link
                        to={`/folder/${this.state.bookmark.folderId}`}
                        className="btn btn--link"
                      >
                        CANCEL
                      </Link>
                    ) : (
                      <Link to={"/"} className="btn btn--link">
                        CANCEL
                      </Link>
                    )}
                  </ButtonList>
                </BoxItem>
              </Box>
            </form>
          </div>
        </div>
        {!this.props.onAddBookmark && (
          <div className="main__item main__item--footer">
            <div className="container container--small">
              <Box>
                <BoxItem alignRight transparent>
                  <button
                    type="submit"
                    disabled={this.state.removing}
                    className="btn btn--link btn--justlink"
                    onClick={this.onRemoveBookmark}
                  >
                    <i className="fa fa-trash" />
                    {this.state.removing ? "REMOVING..." : "REMOVE BOOKMARK"}
                  </button>
                </BoxItem>
              </Box>
            </div>
          </div>
        )}
      </div>
    );
  }
}

BookmarkForm.propTypes = {
  bookmark: PropTypes.object,
  folders: PropTypes.array,
  onAddBookmark: PropTypes.func,
  onUpdateBookmark: PropTypes.func,
  onRemoveBookmark: PropTypes.func,
  selectedValue: PropTypes.string
};

export default BookmarkForm;
