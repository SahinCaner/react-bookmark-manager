import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class CreateFolderForm extends Component {
  constructor(props) {
    super(props);

    
    this.state = {
      folderName: props.folder ? props.folder.folderName : '',
      note: props.folder ? props.folder.note : '',
      createdAt: moment().format("MMMM Do YYYY"),
      bookmarks: {},
      error: ''
    };
  }

  onFolderNameChange = (e) => {
    const folderName = e.target.value;
    this.setState(() => ({ folderName }));
  }

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.folderName) {
      this.setState(() => ({ error: 'Please provide folder name.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        folderName: this.state.folderName,
        createdAt: this.state.createdAt,
        note: this.state.note,
        bookmarks: []
      });
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="Folder Name"
          autoFocus
          value={this.state.folderName}
          onChange={this.onFolderNameChange}
          className="text-input"
        />
        <textarea
          placeholder="Add a note for your bookmark folder (optional)"
          value={this.state.note}
          onChange={this.onNoteChange}
          className="textarea"
        >
        </textarea>
        <div>
          <button className="button">{this.props.buttonName ? this.props.buttonName : 'Add Folder'}</button>
        </div>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
      </form>
    );
  }
}
