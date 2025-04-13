import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const host = 'http://localhost:5000';

const ReviewFormPopup = ({ onClose, doctorData }) => {
  const navigate = useNavigate();
  console.log(doctorData)
  const [doctorId, setDoctorId] = useState(doctorData._id);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [date, setDate] = useState('');
  const [service, setService] = useState('');
  const [helpful, setHelpful] = useState(true);
  const [responseTime, setResponseTime] = useState('');
  const [staffRating, setStaffRating] = useState(5);
  const [facilityRating, setFacilityRating] = useState(4);
  const [loading, setLoading] = useState(false); // Loading state
  const token = localStorage.getItem('authtoken');
  useEffect(() => {
    if (doctorData && doctorData.doctorId) {
      setDoctorId(doctorData.doctorId);
    }
  }, [doctorData]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (!token) {
        toast.warning('Please log in to submit a review.', {
          position: 'top-center',
          theme: 'dark',
        });
        navigate('/login');
        return;
      }
      
      const response = await fetch(`${host}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authtoken: token,
        },
        body: JSON.stringify({
          doctorId,
          rating,
          comment,
          date,
          service,
          helpful,
          responseTime,
          staffRating,
          facilityRating,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.msg || 'Failed to submit review. Please try again.', {
          position: 'top-center',
          theme: 'dark',
        });
        return;
      }

      toast.success('Review submitted successfully!', {
        position: 'top-center',
        theme: 'dark',
      });
      
      setLoading(false); 
      setDoctorId("")
      setRating("")
      setComment("")
      setDate("")
      setService("")
      setHelpful("")
      setResponseTime("")
      setStaffRating("")
      setFacilityRating("")
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again later.', {
        position: 'top-center',
        theme: 'dark',
      });
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="review-form-popup-overlay">
      <div className="review-form-popup">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Submit Your Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="doctorId">Doctor ID:</label>
            <input type="text" id="doctorId" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required disabled />
          </div>
      
          <div className="form-group">
            <label htmlFor="rating">Rating (1-5):</label>
            <input type="number" id="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))} min="1" max="5" required />
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="service">Service:</label>
            <input type="text" id="service" value={service} onChange={(e) => setService(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="helpful">Helpful:</label>
            <select id="helpful" value={helpful} onChange={(e) => setHelpful(e.target.value === 'true')}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="responseTime">Response Time:</label>
            <input type="text" id="responseTime" value={responseTime} onChange={(e) => setResponseTime(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="staffRating">Staff Rating (1-5):</label>
            <input type="number" id="staffRating" value={staffRating} onChange={(e) => setStaffRating(Number(e.target.value))} min="1" max="5" required />
          </div>
          <div className="form-group">
            <label htmlFor="facilityRating">Facility Rating (1-5):</label>
            <input type="number" id="facilityRating" value={facilityRating} onChange={(e) => setFacilityRating(Number(e.target.value))} min="1" max="5" required />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ReviewFormPopup;