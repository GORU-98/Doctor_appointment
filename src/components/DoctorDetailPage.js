import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Schedule from './Schedule';
import Popup from './Popup';
import { Mail, CalendarCheck, MapPin, Clock, Star, Award, BookOpen } from 'lucide-react';
import ReviewForm from './ReviewForm';

const DoctorDetailPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const location = useLocation();
  const { doctor } = location.state || {};
  if (!doctor) return <div className="no-data">Doctor details not found.</div>;


  const {
    doctorName,
    speciality,
    image,
    bio,
    averageRating,
    qualification,
    yearsOfExperience,
    languageSpoken,
    feeStructure,
    acceptedPaymentMethod,
    pastExperience,
    awardsAndRecognitions,
    publishedResearchAndArticles,
    treatmentOffered,
    contactInformation,
    clinicHospitalAddress,
    operatingHours,
    appointmentAvailability,
    welcomeMessage,
    socialMediaProfiles,
  } = doctor;

  const handleOpen = () => setShowPopup(true);
  const handleOpen1 = () => setShowPopup1(true);
  const handleClose = () => setShowPopup(false);
  const handleClose1 = () => setShowPopup1(false);

  return (
    <div className="doctor-detail-page">
      <div className="doctor-card">
      <img src={image || 'pics/doc.jpg'} alt={doctorName} className="doctor-avatar" />

        <div className="info-section">
          <h1>{doctorName}</h1>
          <p className="highlight"><Star size={16} /> Rating: {averageRating || "4.5"}</p>
          <p className="special"><BookOpen size={16} /> {speciality}</p>
          <p><strong>Qualification:</strong> {qualification}</p>
          <p><strong>Experience:</strong> {yearsOfExperience} years</p>

          <p><strong>Languages:</strong> {languageSpoken?.join(', ') || 'N/A'}</p>
          <div className="divider" />

          <p><strong>Fee:</strong> {feeStructure}</p>
<p><strong>Payment Methods:</strong> {acceptedPaymentMethod?.join(', ') || 'N/A'}</p>
          <p><strong>Operating Hours:</strong> <Clock size={16} /> {operatingHours}</p>
          <p><strong>Address:</strong> <MapPin size={16} /> {clinicHospitalAddress}</p>
          <p><strong>Availability:</strong> <CalendarCheck size={16} /> {appointmentAvailability}</p>

          <div className="buttons">
            <button className="btn primary" onClick={handleOpen}>Book Appointment</button>
            {contactInformation?.email && (
  <a href={`mailto:${contactInformation.email}`} className="btn secondary">
    <Mail size={16} /> Email
  </a>
)}

            <button className="btn primary" onClick={handleOpen1}>Review Doctor</button>
          </div>
        </div>
      </div>

      <div className="bio-section">
        <h2>About {doctorName}</h2>
        <p>{bio}</p>
      </div>

      <div className="extras">
      {Array.isArray(awardsAndRecognitions) && awardsAndRecognitions.length > 0 && (
  <p><strong><Award size={16} /> Awards:</strong> {awardsAndRecognitions.join(', ')}</p>
)}

{Array.isArray(publishedResearchAndArticles) && publishedResearchAndArticles.length > 0 && (
  <p><strong>Published Articles:</strong> {publishedResearchAndArticles.join(', ')}</p>
)}

{Array.isArray(treatmentOffered) && treatmentOffered.length > 0 && (
  <p><strong>Treatments Offered:</strong> {treatmentOffered.join(', ')}</p>
)}
        {welcomeMessage && <blockquote className="welcome">"{welcomeMessage}"</blockquote>}
      </div>

      {socialMediaProfiles && (
        <div className="social-links">
          {socialMediaProfiles.linkedin && <a href={socialMediaProfiles.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          {socialMediaProfiles.twitter && <a href={socialMediaProfiles.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>}
          {socialMediaProfiles.instagram && <a href={socialMediaProfiles.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
          {socialMediaProfiles.facebook && <a href={socialMediaProfiles.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}
        </div>
      )}

      {showPopup && (
        <Popup onClose={handleClose}>
          <Schedule doctorData={doctor} onClose={handleClose} />
        </Popup>
      )}
      {showPopup1 && (
        <Popup onClose={handleClose1}>
          <ReviewForm doctorData={doctor} onClose={handleClose1} />
        </Popup>
      )}
    </div>
  );
};

export default DoctorDetailPage;
