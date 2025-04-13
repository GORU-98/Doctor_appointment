import React from 'react'
import { useNavigate } from 'react-router-dom'

const Section = () => {

    const navigate=useNavigate();

  return (
    <>
    
<div class="parent">
    <div class="div1" onClick={()=>navigate("/appointments")}> 
        <h1>View Appointments</h1>       
        </div>
    <div class="div2" onClick={()=>navigate("/report")}><h1>Reports</h1></div>
    <div class="div3"><h1>Features</h1></div>
    <div class="div5" onClick={()=>navigate("/blog")}><h1>Blogs</h1></div>
    <div class="div6" onClick={()=>navigate("/chat")}><h1>Chat with ChatBot</h1></div>
    <div class="div7" onClick={()=>navigate("/reviews")}><h1>Reviews</h1></div>
    <div class="div8"><h1>Payments and Billings</h1></div>
    <div class="div9" onClick={()=>navigate("/list")}><h1>Check all Doctors</h1></div>
</div>
    
    </>
  )
}

export default Section
