import React, { useState } from 'react';

const PrescriptionForm = ({ onClose, onSubmit, userId, doctorId }) => {
  const [treatment, setTreatment] = useState('');
  const [medicine, setMedicine] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ userId, doctorId, treatment, medicine });
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h3>Write Prescription</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Treatment:
            <input type="text" value={treatment} onChange={(e) => setTreatment(e.target.value)} required />
          </label>
          <label>
            Medicine:
            <input type="text" value={medicine} onChange={(e) => setMedicine(e.target.value)} required />
          </label>
          <button type="submit">Submit</button>
          <button onClick={onClose} type="button" className="cancel">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionForm;
