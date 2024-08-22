import React from 'react';
import './Alert.css'; // Uyarı stil dosyası

const Alert = ({ message, type, onClose }) => {
  return (
    <div className={`alert-${type}`}>
      <span>{message}</span>
      <button className="close-button" onClick={onClose}>X</button>
    </div>
  );
};

export default Alert;
