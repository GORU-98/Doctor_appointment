import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Popup = ({ onClose, children }) => {
  const token=localStorage.getItem("authtoken");
  const navigate= useNavigate();
useEffect(() => {
    if (!token) {
      navigate('/login');
    }
   
    // eslint-disable-next-line
  }, []);
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
