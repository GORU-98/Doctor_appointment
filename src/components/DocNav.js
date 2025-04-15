import React, { useRef, useState } from 'react'
import {   ClipboardCheck, LogOut, UserCircle, UsersRound , Home} from "lucide-react";
import { Outlet, useNavigate } from 'react-router-dom';

const DocNav = () => {
  const [m,setM] = useState(false);
    const ref=useRef();
  const navigate= useNavigate();
  const handleConfirm=()=>{
    localStorage.removeItem("docToken");
    navigate("/doctorlogin");
  
   }
   const handleCancel=()=>{
   setM(!m);
  
   }
  return (
   <>
     <aside className="sidebar">
        <h2 className="logo">HealthCare </h2>
        <nav>
          <ul>
            <li><Home size={18} /> <span onClick={()=>navigate("/doctorHome")}>Home</span></li>
            <li><UserCircle size={18} /> <span onClick={()=>navigate("/doctorHome/doctorProfilePage")}>Profile</span></li>
            <li><ClipboardCheck size={18} /> <span onClick={()=>navigate("/doctorHome/acceptedAppointments")}>Appointments </span> </li>
            <li><UsersRound size={18} /> <span onClick={()=>navigate("/doctorHome/doctorappointments")}> All Appointments</span></li>
            <li><LogOut size={18} /> <span onClick={()=>setM(!m)}>Logout</span></li>
          </ul>
        </nav>
      </aside>

      <div className='modal' ref={ref} style={{display:m ? "flex" : "none",backgroundColor:"white"}} >
    <h1>Do you want to really Log Out !</h1>
    <div className="btn">
    <button onClick={handleConfirm}>Confirm</button>
    <button onClick={handleCancel}>Cancel</button>
    </div>
   </div>
      <Outlet/>
   </>
  )
}

export default DocNav
