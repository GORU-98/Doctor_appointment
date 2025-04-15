import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem('docToken');
const host = 'http://localhost:5000';

export default function Doctor() {
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ acceptedCount: 0, pendingCount: 0 });

const navigate=useNavigate()
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        if (!token) {
          toast.warning('Login into Your Account.', {
            position: 'top-center',
            theme: 'dark',
          });
          navigate('/login');
          return;
        }
        const response = await fetch(`${host}/doctorDetail`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            docToken: token,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch doctor data: ${response.status}`);
        }

        const data = await response.json();
        setReviews(data);
      } catch (err) {
        toast.error(err.message || 'An error occurred while fetching doctor data.', {
          position: 'top-center',
          autoClose: 5000,
          theme: 'dark',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();

    const fetchAppointmentCounts = async () => {
      try {
        if (!token) {
          toast.warning('Login into Your Account.', {
            position: 'top-center',
            theme: 'dark',
          });
          navigate('/login');
          return;
        }
        const res = await fetch(`${host}/appointments/counts`, {
          headers: {
            'Content-Type': 'application/json',
            docToken: token,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch appointment counts');
    
        const data = await res.json();
        setCounts(data);
      } catch (error) {
        console.error(error);
        toast.error(error.message, { position: 'top-center', theme: 'dark' });
      }
    };
    
    fetchAppointmentCounts();
     // eslint-disable-next-line
  }, []);

  if (loading) {
    return <div className="dashboard">Loading...</div>;
  }

  if (!reviews) {
    return <div className="dashboard">Doctor data could not be loaded.</div>;
  }

  return (
    <div className="dashboard">
      <main className="main-content">
        <header className="header">
          <div>
            <h1>Hello, Dr. {reviews.doctorName} 👋</h1>
            <h3>{reviews.welcomeMessage}</h3>
            <p>Here’s what’s happening today</p>
          </div>
          <Bell size={22} className="notification-icon" />
        </header>

        <section className="cards">
          <div className="card" onClick={()=>navigate("/doctorHome/doctorProfilePage")}>
            <h3>Profile</h3>
            <p>View Your Profile Dr. {reviews.doctorName}</p>
          </div>
          <div className="card" onClick={()=>navigate("/doctorHome/acceptedAppointments")}>
            <h3>Today’s Appointments</h3>
            <p>{counts.acceptedCount} Appointments Scheduled</p>
          </div>
          <div className="card" onClick={()=>navigate("/doctorHome/doctorappointments")}>
            <h3>Requests</h3>
            <p>{counts.pendingCount} Pending Approvals</p>
          </div>
         
        </section>
      </main>
      <ToastContainer />
    </div>
  );
}
