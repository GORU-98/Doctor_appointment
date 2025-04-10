import React from "react";
import { Bell, CalendarDays, ClipboardCheck, LogOut, UserCircle, UsersRound, Wallet } from "lucide-react";

export default function Doctor() {
  return (
    <div className="dashboard">
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

      <main className="main-content">
        <header className="header">
          <div>
            <h1>Hello, Dr. Smith 👋</h1>
            <p>Here’s what’s happening today</p>
          </div>
          <Bell size={22} className="notification-icon" />
        </header>

        <section className="cards">
          <div className="card">
            <h3>Today’s Appointments</h3>
            <p>5 Appointments Scheduled</p>
          </div>
          <div className="card">
            <h3>Requests</h3>
            <p>3 Pending Approvals</p>
          </div>
          <div className="card">
            <h3>Patient History</h3>
            <p>View Recent Consultations</p>
          </div>
          <div className="card">
            <h3>Notifications</h3>
            <p>2 New Alerts</p>
          </div>
        </section>
      </main>
    </div>
  );
}
