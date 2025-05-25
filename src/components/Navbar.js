import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [m, setM] = useState(false); // modal toggle
  const [nav, setNav] = useState(false); // menu toggle
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const iconRef = useRef(null);
  const handleConfirm = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };

  const handleCancel = () => {
    setM(false);
  };


  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        nav && // only check if menu is open
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        iconRef.current &&
        !iconRef.current.contains(e.target)
      ) {
        setNav(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [nav]);
  return (
    <>
      {/* Header Navbar */}
      <div className="navbar">
        <div className="nav_logo">
          <h1>HealthCare</h1>
        </div>
        <div className="menu_icon" onClick={() => setNav(!nav)} ref={iconRef}>
          <img src="/icons/menu.png" alt="menu" />
        </div>
      </div>

      {/* Slide-in Side Menu */}
      <div className={`side_menu ${nav ? 'show' : ''}`} ref={menuRef}>
        <ul>
          <li><a href="/" onClick={() => setNav(false)}>Home</a></li>
          <li><a href="/blog" onClick={() => setNav(false)}>Blogs</a></li>
          <li><a href="/chat" onClick={() => setNav(false)}>ChatBot</a></li>
          <li><a href="/reviews" onClick={() => setNav(false)}>Reviews</a></li>
          <li><a href="/report" onClick={() => setNav(false)}>Reports</a></li>
          <li><a href="/features" onClick={() => setNav(false)}>Features</a></li>
          <li><a href="/list" onClick={() => setNav(false)}>All Doctors</a></li>
          <li><a href="/appointments" onClick={() => setNav(false)}>View Appointments</a></li>
          <li className="logout" onClick={() => { setM(true); setNav(false); }}>Log Out</li>
        </ul>
      </div>

      {/* Logout Confirmation Modal */}
      <div className="modal" style={{ display: m ? 'flex' : 'none' }}>
        <h1>Do you really want to log out?</h1>
        <div className="btn">
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Navbar;
