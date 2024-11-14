import React from 'react';

const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="errorModalLabel">Error</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {message}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
