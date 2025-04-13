import React from 'react'
import {  CalendarDays, ClipboardCheck, LogOut, UserCircle, UsersRound, Wallet } from "lucide-react";
import { Outlet } from 'react-router-dom';
const DocNav = () => {
  return (
   <>
     <aside className="sidebar">
        <h2 className="logo">HealthCare Pro</h2>
        <nav>
          <ul>
            <li><CalendarDays size={18} /> <span>Dashboard</span></li>
            <li><ClipboardCheck size={18} /> <span>Appointments</span></li>
            <li><UsersRound size={18} /> <span>Patients</span></li>
            <li><CalendarDays size={18} /> <span>Schedule</span></li>
            <li><Wallet size={18} /> <span>Billing</span></li>
            <li><UserCircle size={18} /> <span>Profile</span></li>
            <li><LogOut size={18} /> <span>Logout</span></li>
          </ul>
        </nav>
      </aside>
      <Outlet/>
   </>
  )
}

export default DocNav
