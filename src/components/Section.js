import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const token=localStorage.getItem("authtoken");
const Section = () => {

    const navigate=useNavigate();
    useEffect(() => {
        if (!token) {
          navigate('/login');
        }
       
        // eslint-disable-next-line
      }, []);
  return (
    <>
    
<div className="parent">
    <div className="div1" onClick={()=>navigate("/appointments")}> 
        <h1>View Appointments</h1>       
        </div>
    <div className="div2" onClick={()=>navigate("/report")}><h1>Reports</h1></div>
    <div className="div3"><h1>Features</h1></div>
    <div className="div5" onClick={()=>navigate("/blog")}><h1>Blogs</h1></div>
    <div className="div6" onClick={()=>navigate("/chat")}><h1>Chat with ChatBot</h1></div>
    <div className="div7" onClick={()=>navigate("/reviews")}><h1>Reviews</h1></div>
    <div className="div8"><h1>More than medicine — we treat with empathy, purpose, and care</h1></div>
    <div className="div9" onClick={()=>navigate("/list")}><h1>Check all Doctors</h1></div>
</div>
    
    </>
  )
}

export default Section
