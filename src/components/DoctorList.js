import React, { useEffect, useState } from 'react';
import DoctorCard from './DoctorCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
const token = localStorage.getItem('authtoken');
const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
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
