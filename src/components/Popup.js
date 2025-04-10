import React from 'react';

const Popup = ({ onClose, children }) => {
  return (
    <div className="popup-backdrop">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
