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
  
  
  const handleRedirect=()=>{
    navigate("/login");
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
        <h1>Tourism</h1>
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
          <button type="submit" onClick={handleClick}>Sign In</button>
                <p  className='pp'>Already have a account? <span onClick={handleRedirect}> Login</span></p>
    
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
