import React from 'react';
import ReactModal from 'react-modal';

const RemoveModal = (props) => (
  <ReactModal
    isOpen={!!props.hasBookmarks}
    onRequestClose={props.removeModalCancel}
    contentLabel="Selected Option"
    closeTimeoutMS={200}
    appElement={app}
    className="modal">
    
    <div className="modal-body">
      <h3>Are you sure?</h3>
      <p>This folder contains bookmarks. If you delete this folder all the bookmarks will be deleted.</p>
    </div>

    <button
      onClick={props.removeModalCancel}
      className="button">
      Cancel
    </button>
  </ReactModal>
);

export default RemoveModal;