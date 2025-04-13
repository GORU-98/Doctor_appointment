import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem('docToken');

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
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
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

      toast.success(`Appointment ${status}`);
      fetchAppointments(); 
    } catch (err) {
      toast.error(err.message);
    }
  };
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <div className="appointment-list">
      <h2>Appointment Requests</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appt, index) => (
          <div key={index} className="appointment-card">
            <p><strong>Patient:</strong> {capitalize(appt.userid?.name)} {capitalize(appt.userid?.lname)}</p>
            <p><strong>Email:</strong> {appt.userid?.email}</p>
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
