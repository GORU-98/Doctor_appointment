import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

const DoctorSignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctorName: '',
    speciality: '',
    bio: '',
    qualification: '',
    yearsOfExperience: '',
    languageSpoken: [],
    feeStructure: '',
    acceptedPaymentMethod: [],
    pastExperience: '',
    awardsAndRecognitions: '',
    publishedResearchAndArticles: '',
    treatmentOffered: [],
    phoneNumber: '',
    email: '',
    password: '',
    cpassword: '',
    clinicHospitalAddress: '',
    operatingHours: '',
    appointmentAvailability: '',
    welcomeMessage: '',
    linkedin: '',
    twitter: ''
  });

  const languages = ['English', 'Hindi', 'Spanish', 'French', 'German'];
  const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking'];
  const treatments = [
    "Angioplasty", "Pacemaker Implantation", "Heart Failure Management", "Echocardiography",
    "Cardiac Rehabilitation", "Bypass Surgery", "Electrophysiology Studies", "Valve Replacement",
    "Preventive Cardiology", "Interventional Cardiology"
  ];

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;

    if (type === 'select-multiple') {
      const values = Array.from(selectedOptions, option => option.value);
      setFormData({ ...formData, [name]: values });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("hello")
      const res = await axios.post("http://localhost:5000/doctorsignup", formData);
      if (!res) {
        toast.error("404:Internal Server Error", {
          position: "top-center",
          theme: "dark"
        });
        return;
      }
      const result = res.data;

      // console.log(result)
      if (result.status !== 201) {
        toast.error(result.msg || "Something went wrong", {
          position: "top-center",
          theme: "dark"
        });
        return;
      }
      localStorage.setItem("docToken", result.docToken);
      if (result.status === 201) {
        navigate("/doctorHome");
      }
      setFormData({
        doctorName: '',
        speciality: '',
        bio: '',
        qualification: '',
        yearsOfExperience: '',
        languageSpoken: [],
        feeStructure: '',
        acceptedPaymentMethod: [],
        pastExperience: '',
        awardsAndRecognitions: '',
        publishedResearchAndArticles: '',
        treatmentOffered: [],
        phoneNumber: '',
        email: '',
        clinicHospitalAddress: '',
        operatingHours: '',
        appointmentAvailability: '',
        welcomeMessage: '',
        linkedin: '',
        twitter: ''
      });


    } catch (error) {
      toast.error(error || "404:Internal Server Error", {
        position: "top-center",
        theme: "dark"
      });
      return
    }
  };

  useEffect(() => {
    toast.info("Register as a Doctor", {
      position: "top-center",
      theme: "dark"
    });

  }, [])

  return (
    <>
      <div className="doctor_signup_page">
        <div className="doc_sec_1">
          <div className="logo_nav">HealthCare</div>
          <section>
            <form className="doctor_form" onSubmit={handleSubmit}>
              <h1>Register as a Doctor</h1>

              <label htmlFor="doctorName">Name</label>
              <input type="text" name="doctorName" value={formData.doctorName} onChange={handleChange} required />

              <label htmlFor="speciality">Speciality</label>
              <input type="text" name="speciality" value={formData.speciality} onChange={handleChange} required />

              <label htmlFor="bio">Bio</label>
              <textarea name="bio" value={formData.bio} onChange={handleChange} required />

              <label htmlFor="qualification">Qualification</label>
              <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} required />

              <label htmlFor="yearsOfExperience">Years of Experience</label>
              <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} required />

              <label htmlFor="languageSpoken">Languages Spoken</label>
              <select name="languageSpoken" multiple value={formData.languageSpoken} onChange={handleChange}>
                {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
              </select>

              <label htmlFor="feeStructure">Fee Structure</label>
              <input type="text" name="feeStructure" value={formData.feeStructure} onChange={handleChange} required />

              <label htmlFor="acceptedPaymentMethod">Accepted Payment Methods</label>
              <select name="acceptedPaymentMethod" multiple value={formData.acceptedPaymentMethod} onChange={handleChange}>
                {paymentMethods.map(method => <option key={method} value={method}>{method}</option>)}
              </select>

              <label htmlFor="pastExperience">Past Experience</label>
              <textarea name="pastExperience" value={formData.pastExperience} onChange={handleChange} />

              <label htmlFor="awardsAndRecognitions">Awards and Recognitions</label>
              <textarea name="awardsAndRecognitions" value={formData.awardsAndRecognitions} onChange={handleChange} />

              <label htmlFor="publishedResearchAndArticles">Published Research and Articles</label>
              <textarea name="publishedResearchAndArticles" value={formData.publishedResearchAndArticles} onChange={handleChange} />

              <label htmlFor="treatmentOffered">Treatments Offered</label>
              <select name="treatmentOffered" multiple value={formData.treatmentOffered} onChange={handleChange}>
                {treatments.map(treat => <option key={treat} value={treat}>{treat}</option>)}
              </select>

              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />

              <label htmlFor="email">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />

              <label htmlFor="password">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
              <label htmlFor="cpassword">Confirm Password</label>
              <input type="password" name="cpassword" value={formData.cpassword} onChange={handleChange} required />

              <label htmlFor="clinicHospitalAddress">Clinic/Hospital Address</label>
              <textarea name="clinicHospitalAddress" value={formData.clinicHospitalAddress} onChange={handleChange} required />

              <label htmlFor="operatingHours">Operating Hours</label>
              <input type="text" name="operatingHours" value={formData.operatingHours} onChange={handleChange} required />

              <label htmlFor="appointmentAvailability">Appointment Availability</label>
              <textarea name="appointmentAvailability" value={formData.appointmentAvailability} onChange={handleChange} required />

              <label htmlFor="welcomeMessage">Welcome Message</label>
              <textarea name="welcomeMessage" value={formData.welcomeMessage} onChange={handleChange} required />

              <label htmlFor="linkedin">LinkedIn</label>
              <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} />

              <label htmlFor="twitter">Twitter</label>
              <input type="text" name="twitter" value={formData.twitter} onChange={handleChange} />

              <button type="submit">Sign Up</button>


              <div className='user_btn'>

                <p >Don't have an account? <span onClick={() => navigate("/create-user")
                }> Create Account</span></p>
                <p >Already have a account? <span onClick={() => navigate("/login")}> Login</span></p>
                <p>Already have a account as a Doctor? <span onClick={() => navigate("/doctorLogin")}> Login</span></p>

              </div>
            </form>
          </section>
        </div>

        <div className="doc_sec_2"></div>

      </div>
      <ToastContainer />
    </>
  );
};

export default DoctorSignUpForm;
