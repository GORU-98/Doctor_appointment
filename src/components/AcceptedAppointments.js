import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import PrescriptionForm from './PrescriptionForm'
const host = 'http://localhost:5000';
const token = localStorage.getItem('docToken');

const AcceptedAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcceptedAppointments = async () => {
      try {
        const response = await fetch(`${host}/appointments/accepted`, {
          headers: {
            'Content-Type': 'application/json',
            docToken: token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch accepted appointments');
        }

        const data = await response.json();
        // console.log(data.length)
        setAppointments(data);
      } catch (error) {
        toast.error(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedAppointments();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (appointments.length === 0) return <p>No accepted appointments found.</p>;
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  return (
    <div className="accepted-appointments-page">
      <h2>Accepted Appointments</h2>
      <div className="appointment-list">
        {appointments.map((appt) => (
          <div key={appt._id} className="appointment-card">
            <p><strong>Patient:</strong> {capitalize(appt.userid.name)} {capitalize(appt.userid.lname)}</p>
            <p><strong>Email:</strong> {appt.userid.email}</p>
            <p><strong>Problem:</strong> {capitalize(appt.problem)}</p>
            <p><strong>Date:</strong> {appt.appointmentDate}</p>
            <p><strong>Time:</strong> {appt.time}</p>
            <button>Status:{appt.status}</button>
            
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AcceptedAppointments;
