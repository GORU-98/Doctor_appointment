import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const host="http://localhost:5000";

const Signup = () => {

  const navigate=useNavigate();

  const [s,setS] = useState({
    name:"",
    lname:"",
    email:"",
    password:"",
    cpassword:""

  })

  const handleClick=async(e)=>{
      e.preventDefault();
      try {
        if(s.name.length<3 ||s.lname.length<2 || s.email.length<3 || s.password.length<4 ){
          toast.warning("Length of fields is not sufficient",{
            position:"top-center",
            theme:"dark"
        });
          return;
        }
      const res=await fetch(`${host}/create-user`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({...s})
      })
      if(!res){
        toast.error("404:Internal Server Error",{
            position:"top-center",
            theme:"dark"
        });
              return;
    }
      const result= await res.json();
      if(result.status!==201){
        toast.error(result,{
          position:"top-center",
          theme:"dark"
      });
        return;
    }
    localStorage.setItem("authtoken",result.authtoken);
    setS({
      name:"",
      lname:"",
      email:"",
      password:"",
      cpassword:""
    });

  
    if(result.status===201){
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
  
  
  
  
    const handleChange=(e)=>{
      setS({...s,[e.target.name]:e.target.value});
    }
  
    useEffect(()=>{
      toast.info("Create Your Account",{
        position:"top-center",
        theme:"dark"
    });
      
  },[])

  return (
    <>
    <div className='sign_page'>
      <div className="sign_sec_1">
      <div className="logo_nav">
        <h1>HealthCare</h1>
       </div>
       <section>
        <form method='POST' className='sign_form'>

        <h1>Welcome to create account !</h1>
            <p>Please enter Sign up details below !</p>
            <hr />
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={s.name} onChange={handleChange} />
          <label htmlFor="lname">Last Name</label>
          <input type="text" name="lname" id="lname" value={s.lname} onChange={handleChange} />
          <label htmlFor="email">Email</label>
          <input type="email" name='email' id='email'  value={s.email} onChange={handleChange}/>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' id='password' required value={s.password} onChange={handleChange} />
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" name='cpassword' id='cpassword' required value={s.cpassword} onChange={handleChange} />
          <button type="submit" onClick={handleClick}>Sign Up</button>

          <div className='user_btn'>
            
                <p  >Already have a account? <span onClick={()=>navigate("/login")}> Login</span></p>
                <p  >Already have a account as a Doctor? <span onClick={()=>navigate("/doctorLogin")}> Login</span></p>
                <p  >Register as a Doctor? <span onClick={()=>navigate("/doctorsignup")}> Register</span></p>
          </div>
    
        </form>
       </section>

      </div>
      <div className="sign_sec_2"></div>
    </div>

    <ToastContainer/>
     </>
  )
}

export default Signup
