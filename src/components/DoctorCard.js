import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
const token = localStorage.getItem('authtoken');
const DoctorCard = ({ doctor }) => {
  const { doctorName, speciality, image, bio, averageRating } = doctor;
  console.log(doctorName)
  const navigate=useNavigate();
  const handleClick=(doctor)=>{
    if (doctor) {
      navigate("/doctordetails", { state: { doctor } });
    } else {
        toast.error("Doctor details are missing!",{
                position:"top-center",
                theme:"dark"
            });
    }
   
}

  return (
    <div>
    <div className="doctor-card-modern" >
      <div className="doctor-header">
        <div className="doctor-image">
        <img src={image || "/pics/doc.jpg"} alt={doctorName} loading='lazy' />

        </div>
        <div className="doctor-header-details">
          <h2>{doctorName}</h2>
          <p className="specialty">{speciality}</p>
        </div>
      </div>
      <div className="doctor-body">
        <p className="bio">{bio}</p>
      </div>
      <div className="doctor-footer">
        <div className="contact-info">
        <p><strong>Rating:</strong> {averageRating ?? "Not rated"}</p>

        </div>
        <button onClick={()=>handleClick(doctor)}>View Details</button>
      </div>
    </div>


    <ToastContainer  />
    </div>
  );
};

export default DoctorCard;