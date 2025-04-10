import React from 'react';
import doctorReviews from './doctorReviews'; 

const DoctorReviewsPage = () => {
  return (
    <div className="doctor-reviews-page">
      <h1>Doctor and Service Reviews</h1>
      <div className="reviews-list">
        {doctorReviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <h3>{review.patientName}</h3>
              <p className="rating">Rating: {review.rating} / 5</p>
            </div>
            <p className="service">Service: {review.service}</p>
            <p className="date">Date: {review.date}</p>
            <p className="comment">"{review.comment}"</p>
            <div className="review-details">
              <p>Response Time: {review.responseTime}</p>
              <p>Staff Rating: {review.staffRating} / 5</p>
              <p>Facility Rating: {review.facilityRating} / 5</p>
              <p>Helpful: {review.helpful ? 'Yes' : 'No'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorReviewsPage;