import React, {  useRef, useState } from 'react'
import {
  Outlet, useNavigate
} from "react-router-dom";


const Navbar = () => {
  const [m,setM] = useState(false);//to toggle modal 
  const ref=useRef();
    const[nav,setNav] =useState(false);
    const navigate=useNavigate();

 const handleConfirm=()=>{
  localStorage.removeItem("authtoken");
  navigate("/login");

 }
 const handleCancel=()=>{
 setM(!m);

 }
//  useEffect(()=>{
//    if(m){
//     document.body.style.opacity="0.4"
//     // ref.current.style.backgroundColor="red"
//     ref.current.style.opacity="1"
//   }else{
//      document.body.style.opacity="1"

//    }

//  },[m])

  return (
    <>
       <div className="nav_pc" >
      <nav>
    <div className="nav_logo">
        <h1>HealthCare</h1>
    </div>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/report">Reports</a></li>
        <li><a href="/features">Features</a></li>
        <li><a href="/chat">ChatBot</a></li>
        <li><a href="/list">Doctor List</a></li>
        <li className='logout' onClick={()=>setM(!m)}>Log Out</li>
       
    </ul>
    {/* <button type='submit' ><a href="/contact">Contact Us</a></button> */}

   </nav>

<div className="nav_mobile">
        <div className="nav_logo">
        <h1>HealthCare</h1>
         </div>
        <div className="icon" onClick={()=>setNav(!nav)}>
            <img src="/icons/menu.png" alt="menu" />
        </div>
        </div>
    </div>

   <div className="ul_mobile" style={{display:nav?"flex":"none"}} >
    {/* <img src="/icons/cancel.png" alt="cancel" onClick={()=>setNav(false)} /> */}
    {/* <ul>
    <li><a href="/">Home</a></li>
        <li><a href="/bookings">Book</a></li>
        <li><a href="/packeges">Packeges</a></li>
        <li><a href="/gallery">Gallery</a></li>
    </ul> */}
    </div>

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

export default Navbar
