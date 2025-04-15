import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem('docToken');
  const navigate= useNavigate();
  const fetchAppointments = async () => {
    try {
      const res = await fetch('http://localhost:5000/doctorappointments', {
        headers: {
          'Content-Type': 'application/json',
          docToken: token
        }
      });

      if (!res.ok) throw new Error('Failed to fetch appointments');
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      toast.error(`Error: ${err.message}`, {
        position: 'top-center',
        theme: 'dark'
      });
    }
  };

  useEffect(() => {
    if (!token) {
      toast.warning('Login into Your Account.', {
        position: 'top-center',
        theme: 'dark',
      });
      navigate('/login');
      return;
    }
    fetchAppointments();
     // eslint-disable-next-line
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/appointments/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          docToken: token
        },
        body: JSON.stringify({ status })
      });

      if (!res.ok) throw new Error('Failed to update appointment');

      setAppointments(prevAppointments =>
        prevAppointments.map(appt =>
          appt._id.toString() === id.toString()
            ? { ...appt, status }
            : appt
        )
      );

      toast.success(`Appointment ${status}`, {
        position: 'top-center',
        theme: 'dark'
      });
    } catch (err) {
      toast.error(`Error: ${err.message}`, {
        position: 'top-center',
        theme: 'dark'
      });
    }
  };

  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <div className="appointment-list">
      <h2>Appointment Requests</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appt) => (
          <div key={appt._id} className="appointment-card">
            <p>
              <strong>Patient:</strong>{' '}
              {appt.userid?.name ? capitalize(appt.userid.name) : 'Unknown'}{' '}
              {appt.userid?.lname ? capitalize(appt.userid.lname) : ''}
            </p>
            <p><strong>Email:</strong> {appt.userid?.email || 'N/A'}</p>
            <p><strong>Problem:</strong> {capitalize(appt.problem)}</p>
            <p><strong>Date:</strong> {appt.appointmentDate} at {appt.time}</p>
            <p><strong>Status:</strong> {appt.status}</p>

            {appt.status === 'Not accepted yet' && (
              <div className="action-buttons">
                <button onClick={() => updateStatus(appt._id, 'Accepted')}>Accept</button>
                <button onClick={() => updateStatus(appt._id, 'Rejected')}>Reject</button>
              </div>
            )}
          </div>
        ))
      )}
      <ToastContainer />
    </div>
  );
};

export default DoctorAppointments;
