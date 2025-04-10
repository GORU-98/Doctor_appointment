import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  const { name, specialty, imageUrl, bio, contact } = doctor;
  const navigate=useNavigate();
  const handleClick=(doctor)=>{
    navigate("/doctordetails",{state:{doctor}})
    // console.log(doctor)
}

  return (
    <div className="doctor-card-modern" >
      <div className="doctor-header">
        <div className="doctor-image">
          <img src={imageUrl} alt={name} loading='lazy' />
        </div>
        <div className="doctor-header-details">
          <h2>{name}</h2>
          <p className="specialty">{specialty}</p>
        </div>
      </div>
      <div className="doctor-body">
        <p className="bio">{bio}</p>
      </div>
      <div className="doctor-footer">
        <div className="contact-info">
          <p><strong>Contact:</strong> {contact}</p>
        </div>
        <button onClick={()=>handleClick(doctor)}>View Details</button>
      </div>
    </div>
  );
};

export default DoctorCard;