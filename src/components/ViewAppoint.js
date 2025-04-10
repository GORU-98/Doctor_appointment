import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const host = 'http://localhost:5000';
const ViewAppoint = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('authtoken');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!token) {
          toast.warning('Please log in to view appointments.', {
            position: 'top-center',
            theme: 'dark',
          });
          navigate('/login');
          return;
        }

        const res = await fetch(`${host}/appointments`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authtoken: token,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          toast.error(errorData.msg || 'Failed to fetch appointments. Please try again.', {
            position: 'top-center',
            theme: 'dark',
          });
          setLoading(false);
          return;
        }

        const result = await res.json();
        setLoading(false);

        if (result.status === 202) {
          setAppointments(result.data);
        } else {
          toast.error(result.msg || 'Failed to fetch appointments. Please try again.', {
            position: 'top-center',
            theme: 'dark',
          });
        }
      } catch (error) {
        toast.error('An unexpected error occurred. Please try again later.', {
          position: 'top-center',
          theme: 'dark',
        });
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate, token]); // Add navigate and token as dependencies

  const handleCancelAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`${host}/appointments/${appointmentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authtoken: token,
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.msg || 'Failed to cancel appointment. Please try again.', {
          position: 'top-center',
          theme: 'dark',
        });
        return;
      }

      setAppointments(appointments.filter((appointment) => appointment._id !== appointmentId));
      toast.success("Appointment canceled successfully.", {
        position: 'top-center',
        theme: 'dark',
      });

    } catch (err) {
      toast.error('An unexpected error occurred. Please try again later.', {
        position: 'top-center',
        theme: 'dark',
      });
    }
  };

  if (loading) {
    return <div className="loading">Loading appointments...</div>;
  }

  return (
    <div className="appointment-list-page">
      <h1>Your Appointments</h1>
      <div className="appointment-list">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="appointment-card">
            <div className="status-banner">
              {appointment.status === 'accepted' ? (
                <span className="accepted">Accepted</span>
              ) : appointment.status === 'rejected' ? (
                <span className="rejected">Rejected</span>
              ) : (
                <span className="pending">Pending</span>
              )}
            </div>
            <p><strong>Doctor:</strong> {appointment.doctor}</p>
            <p><strong>Problem:</strong> {appointment.problem}</p>
            <p><strong>Appointment Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {appointment.time}</p>
            <p><strong>Request Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
            <button className="cancel-button" onClick={() => handleCancelAppointment(appointment._id)}>
              Cancel Appointment
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewAppoint;