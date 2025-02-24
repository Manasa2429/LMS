import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Assessments from "./pages/Assessments";
import Messages from "./pages/Messages";
import DiscussionForum from "./pages/DiscussionForum";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import LoginSignup from "./components/LoginSignup"; 
import PersonalInfo from "./pages/personalInfo";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="flex h-screen">
        {/* Show Sidebar only if logged in */}
        {isLoggedIn && (
          <Sidebar />
        )}
        
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginSignup formType="login" setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<LoginSignup formType="signup" setIsLoggedIn={setIsLoggedIn} />} />
            
            {/* Protected Routes (Require Login) */}
            {isLoggedIn ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/assessments" element={<Assessments />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/forum" element={<DiscussionForum />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/personal-info" element={<PersonalInfo />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/support" element={<Support />} />
              </>
            ) : (
              // Redirect to login if not authenticated
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
