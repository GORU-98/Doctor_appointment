import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const token = localStorage.getItem('authtoken');
const host = 'http://localhost:5000'; 

const DoctorReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate= useNavigate();
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!token) {
          toast.warning('Login into Your Account.', {
            position: 'top-center',
            theme: 'dark',
          });
          navigate('/login');
          return;
        }
        const response = await fetch(`${host}/reviews`, { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authtoken: token,

          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch reviews: ${response.status}`);
        }

        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching reviews.');
        toast.error(err.message || 'An error occurred while fetching reviews.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
     // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="doctor-reviews-page">
        <p>Loading reviews...</p>
        <ToastContainer /> 
      </div>
    );
  }

  if (error) {
    return (
      <div className="doctor-reviews-page">
        <p>Error: {error}</p>
        <ToastContainer /> 
      </div>
    );
  }
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <div className="doctor-reviews-page">
      <h1>Doctor and Service Reviews</h1>
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              <div className="review-header">
              <h3>
  Reviewed By: {`${capitalize(review.user.name)} ${capitalize(review.user.lname)}`}
</h3>

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
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default DoctorReviewsPage;
