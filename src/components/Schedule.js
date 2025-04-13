import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const host = 'http://localhost:5000';

const Schedule = ({ doctorData }) => {
  const doctorId=doctorData._id
  const { doctorName } = doctorData;
  const navigate = useNavigate();
  const [appointmentDate, setDate] = useState('');
  const [time, setTime] = useState('');
  const [problem, setProblem] = useState('');
  const token = localStorage.getItem('authtoken');
  const [status, setStatus] = useState('Not accepted yet'); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        toast.warning('Please log in to schedule an appointment.', {
          position: 'top-center',
          theme: 'dark',
        });
        navigate('/login');
        return;
      }

      const res = await fetch(`${host}/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authtoken: token,
        },
        body: JSON.stringify({
          doctor: doctorName,
          appointmentDate,
          time,
          problem,
          doctorId,
          status
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.msg || 'Failed to schedule appointment. Please try again.', {
          position: 'top-center',
          theme: 'dark',
        });
        return;
      }

      const result = await res.json();

      if (result.status === 202) {
        toast.success(result.msg, {
          position: 'top-center',
          theme: 'dark',
        });
        setDate('');
        setTime('');
        setProblem('');
        setStatus('Pending'); 
      } else {
        toast.error(result.msg || 'Failed to schedule appointment. Please try again.', {
          position: 'top-center',
          theme: 'dark',
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again later.', {
        position: 'top-center',
        theme: 'dark',
      });
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="schedule-container">
        <h2>Schedule Appointment</h2>
        <div className="status-banner">
          {status}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="doctor">Doctor:</label>
            <input type="text" id="doctor" value={doctorName} required disabled />
          </div>
          <div className="form-group">
            <label htmlFor="problem">Problem:</label>
            <input
              type="text"
              id="problem"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={appointmentDate}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <button type="submit">Schedule</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Schedule;