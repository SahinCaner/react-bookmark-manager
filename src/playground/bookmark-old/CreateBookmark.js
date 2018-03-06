import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BookmarkForm from './BookmarkForm';
import { startCreateBookmark } from '../../actions/bookmarkActions';

export class CreateBookmark extends Component {
  onSubmit = (bookmark, folderId) => {
    this.props.startCreateBookmark(bookmark, folderId);
    this.props.history.push('/');
  }
  render() {
    return (
      <BookmarkForm onSubmit={this.onSubmit} />
    )
  }
}

CreateBookmark.propTypes = {
  startCreateBookmark: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, props) => {
  const folderId = props.match.params.id;
  startCreateBookmark: (bookmark,folderId) => dispatch(startCreateBookmark(bookmark,folderId))
};

// const mapStateToProps = (state, props) => ({
//   folder: state.folders.find((folder) => folder.id === props.match.params.id)
// });

export default connect(undefined, mapDispatchToProps)(CreateBookmark);

