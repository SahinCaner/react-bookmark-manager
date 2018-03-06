import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {connect} from 'react-redux';
import { startCreateBookmark } from '../../actions/bookmarkActions';

export default class BookmarkForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmarkName: '',
      bookmarkLink: '',
      createdAt: moment().format("MMMM Do YYYY"),
      errors: {}
    };
  }

  onBookmarkNameChange = (e) => {
    const bookmarkName = e.target.value;
    this.setState(() => ({ bookmarkName }));
  }

  onBookmarkLinkChange = (e) => {
    const bookmarkLink = e.target.value;
    this.setState(() => ({ bookmarkLink }));
  };

  bookmarkFormIsValid = () => {
    let formIsValid = true;
    let errors = {};

    if (!this.state.bookmarkName) {
      errors.bookmarkName = 'Please enter name for this bookmark';
      formIsValid = false
    }

    if (!this.state.bookmarkLink) {
      errors.bookmarkLink = 'Please enter name for this bookmark';
      formIsValid = false
    }

    this.setState({ errors });
    return formIsValid;
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.bookmarkFormIsValid()) {
      return;
    }
    this.props.onSubmit({
      bookmarkName: this.state.bookmarkName,
      bookmarkLink: this.state.bookmarkLink,
      createdAt: this.state.createdAt,
    });
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
       {this.state.errors.bookmarkName && <p> {this.state.errors.bookmarkName} </p>}
        <input
          type="text"
          placeholder="Bookmark Name"
          autoFocus
          value={this.state.bookmarkName}
          onChange={this.onBookmarkNameChange}
          className="text-input"
        />
        {this.state.errors.bookmarkName && <p> {this.state.errors.bookmarkLink} </p>}
        <input
          type="text"
          placeholder="Bookmark Link"
          autoFocus
          value={this.state.bookmarkLink}
          onChange={this.onBookmarkLinkChange}
          className="text-input"
        />
        
        <div>
          <button className="button">Add bookmark</button>
        </div>
      </form>
    );
  }
}
