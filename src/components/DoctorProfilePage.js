import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Clock, Award, Star, BookOpen, Link as LinkIcon } from 'lucide-react';

const host = 'http://localhost:5000';
const token = localStorage.getItem('docToken');

const DoctorProfilePage = () => {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const res = await fetch(`${host}/doctorDetail`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            docToken: token
          }
        });
        const data = await res.json();
        setDoctor(data);
      } catch (err) {
        console.error('Error fetching doctor profile:', err);
      }
    };

    fetchDoctorData();
  }, []);

  if (!doctor) return <div className="doctor-profile">Loading...</div>;

  return (
    <div className="doctor-profile">
      <div className="profile-card">
        <h1>Dr. {doctor.doctorName}</h1>
        <p className="speciality"><BookOpen size={18} /> {doctor.speciality}</p>
        <p className="welcome">"{doctor.welcomeMessage}"</p>

        <div className="section">
          <h3>Professional Summary</h3>
          <p><strong>Bio:</strong> {doctor.bio}</p>
          <p><strong>Qualification:</strong> {doctor.qualification}</p>
          <p><strong>Experience:</strong> {doctor.yearsOfExperience} years</p>
          <p><strong>Languages:</strong> {doctor.languageSpoken.join(', ')}</p>
        </div>

        <div className="section">
          <h3>Clinic & Appointments</h3>
          <p><MapPin size={16} /> Address: {doctor.clinicHospitalAddress}</p>
          <p><Clock size={16} /> Operating Hours: {doctor.operatingHours} hrs/day</p>
          <p><Star size={16} /> Availability: {doctor.appointmentAvailability}</p>
        </div>

        <div className="section">
          <h3>Fees & Payment</h3>
          <p><strong>Fee Structure:</strong> {doctor.feeStructure}</p>
          <p><strong>Accepted Payments:</strong> {doctor.acceptedPaymentMethod.join(', ')}</p>
        </div>

        <div className="section">
          <h3>Achievements & Research</h3>
          <p><Award size={16} /> Awards: {doctor.awardsAndRecognitions}</p>
          <p><strong>Past Experience:</strong> {doctor.pastExperience}</p>
          <p><strong>Articles/Research:</strong> {doctor.publishedResearchAndArticles}</p>
          <p><strong>Treatments Offered:</strong> {doctor.treatmentOffered.join(', ')}</p>
        </div>

        <div className="section">
          <h3>Contact</h3>
          <p><Phone size={16} /> {doctor.phoneNumber}</p>
          <p><Mail size={16} /> {doctor.email}</p>
        </div>

        <div className="section">
          <h3>Social Links</h3>
          {doctor.linkedin && <p><LinkIcon size={16} /> <a href={`https://${doctor.linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a></p>}
          {doctor.twitter && <p><LinkIcon size={16} /> <a href={`https://${doctor.twitter}`} target="_blank" rel="noreferrer">Twitter</a></p>}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
