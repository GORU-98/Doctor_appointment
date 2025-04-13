import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const token=localStorage.getItem("authtoken");
  const navigate= useNavigate();
useEffect(() => {
    if (!token) {
      navigate('/login');
    }
   
    // eslint-disable-next-line
  }, []);
  return (
    <section className="home-hero">
      <div className="hero-content">
        <h1>Your Health, Our Priority</h1>
        <p>
          Welcome to <strong>HealthCare+</strong>, where expert doctors, modern facilities, and personalized care
          meet to ensure your well-being. Schedule appointments, access reports, and consult specialists—all in one place.
        </p>
        <button className="cta-btn" onClick={()=>navigate("/list")}>Book Appointment</button>
        <button className="cta-btn" onClick={()=>navigate("/chat")}>Chat with Chatbot</button>
      </div>
      <div className="hero-image">
        <img src={"/pics/doc.jpg"} alt="Doctor" />
      </div>
    </section>
  );
};

export default Home;
