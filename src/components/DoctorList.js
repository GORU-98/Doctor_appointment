import React, { useEffect, useState } from 'react';
import DoctorCard from './DoctorCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const token = localStorage.getItem('authtoken');


const DoctorList = () => {

  const [doctors, setDoctors] = useState([]);
  const navigate= useNavigate();
  useEffect(() => {
    fetchDoctors();
     // eslint-disable-next-line
  }, []);

  const fetchDoctors = async () => {
    try {

      if (!token) {
        toast.warning('Login into Your Account.', {
          position: 'top-center',
          theme: 'dark',
        });
        navigate('/login');
        return;
      }
      const response = await fetch('http://localhost:5000/doctors', { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authtoken: token,

        },
      });
      const data = await response.json();
console.log(data)
      if (!response.ok) {
        toast.error('Doctors fetching failed!',{
          position:"top-center",
          theme:"dark"
      });     
     }

      setDoctors(data);
       toast.success('Doctors fetched successfully!',{
          position:"top-center",
          theme:"dark"
      });
    } catch (error) {
      toast.error('Doctors fetching failed!',{
         position:"top-center",
         theme:"dark"
     });
    }
  };

  return (
    <>
    <div className='doclist'>
      {doctors.length > 0 ? (
        doctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))
      ) : (
        <p>No doctors found.</p>
      )}
    </div>
    <ToastContainer  />
      </>
  );
};

export default DoctorList;
