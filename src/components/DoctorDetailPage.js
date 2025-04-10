import React, { useState,useMemo  } from 'react';
import { useLocation } from 'react-router-dom';
import Schedule from "./Schedule"
import Popup from './Popup';
const DoctorDetailPage = () => {
  const location = useLocation();
  const {doctor} = location.state || {}
// console.log(doctor.doctor)
  const { name, specialty, imageUrl, bio, contact } = doctor;

  const [showPopup, setShowPopup] = useState(false);

  const handleOpen = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);

  const memoizedDoctor = useMemo(() => doctor, [doctor]);
  return (
    <>
    <div className="doctor-detail-page">
      <div className="doctor-header">
        <img src={imageUrl} alt={name} className="doctor-image" loading='lazy'/>
        <div className="doctor-info">
          <h1>{name}</h1>
          <p className="specialty">{specialty}</p>
          <p className="contact">Contact: {contact}</p>
          <div className="doctor-buttons">
            <button className="book-appointment"  onClick={handleOpen}>Book Appointment</button>
            <button className="email">Email</button>
          </div>
        </div>
      </div>
      <div className="doctor-bio">
        <h2>About {name}</h2>
        <p>{bio}</p>
      </div>
     
    </div>
    {showPopup && (
        <Popup onClose={handleClose}>
          <Schedule doctorData={memoizedDoctor}  onClose={handleClose} />
        </Popup>
      )}
    </>
  );
};

export default DoctorDetailPage;