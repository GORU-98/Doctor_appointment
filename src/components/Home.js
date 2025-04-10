import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import DoctorDetailPage from './DoctorDetailPage';
// import Schedule from './Schedule';
// import Doctor from './Doctor';
// import Uline from './Uline'

const Home = () => {


  const token = localStorage.getItem("authtoken");
  const navigate=useNavigate();

  // const handleClick=()=>{
  //   navigate("/gallery");
  // }
    useEffect
    (()=>{
      if(!token){
          navigate("/login")
      }
      // eslint-disable-next-line
          },[]);

  return (
    <>
    <section className="hero">
  <h3>Your Health, Our Priority</h3>
  <h1 className='first'>Book trusted doctors, consult online</h1>
  <h1 className='second'>access your health records — all in one secure place.</h1>
  <div className="buttons">
    <button>Book Appointment</button>
    <button>Join as Doctor</button>
  </div>

</section>

{/* <Doctor/>    */}
{/* <Schedule/> */}
{/* <DoctorDetailPage/> */}
    </>
  )
}

export default Home
