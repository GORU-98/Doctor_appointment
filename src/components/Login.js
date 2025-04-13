import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const host="http://localhost:5000";
const Login = () => {

  const navigate=useNavigate();
  const [l,setL] = useState({
    email:"",
    password:""
  });



  const handleClick=async(e)=>{
    e.preventDefault();
console.log("I am here")
    try {

      if(l.email.length<4){
        toast.error("Length of fields is not sufficient",{
          position:"top-center",
          theme:"dark"
        })
        return;
      }

    const res=await fetch(`${host}/login`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({...l})
    })

    if(!res){
      toast.error("404:Internal Server Error",{
          position:"top-center",
          theme:"dark"
      });
            return;
  }
    const result=await res.json();

    if(result.status!==200){
      toast.error(result,{
        position:"top-center",
        theme:"dark"
    });
      return;
  }
  localStorage.setItem("authtoken",result.authtoken);
  setL({
    email:"",
    password:""
  });

  if(result.status===200){
    navigate("/");
  }
} catch (error) {
  toast.error("404:Internal Server Error",{
    position:"top-center",
    theme:"dark"
});
 
      return;
}

  }

const handleRedirect=()=>{
  navigate("/create-user");
}
  const handleChange=(e)=>{
    setL({...l,[e.target.name]:e.target.value})
  }

  
  useEffect(()=>{
    toast.info("Login into Your Account",{
      position:"top-center",
      theme:"dark"
  });
    
},[])
  return (
    <>
    <div className='login_page'>
      <div className="l_sec1">
       <div className="logo_nav">
        <h1>Tourism</h1>
       </div>
        <section>
            <div className="txt">
            <h1>Welcome back !</h1>
            <p>Please enter login details below !</p>
            <hr/>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email"  value={l.email} onChange={handleChange} required/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={l.password} onChange={handleChange} required/>
                <button type="submit" onClick={handleClick} >Sign In</button>
                
                <p  className='pp'>Don't have an account? <span onClick={handleRedirect}> Create Account</span></p>
                <p  className='pp'>Register As a Doctor <span onClick={()=>navigate("/doctorsignup")}>Click here</span></p>
                
           
            </div>
        </section>
      </div>
      <div className="l_sec2"></div>
    </div>
<ToastContainer/>
</>
  )
}

export default Login
