import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";  // ✅ Use "../" to go up one level

const Sidebar = ({ role }) => {
  const navigate = useNavigate(); // React Router navigation

  return (
    <nav className="col-md-3 col-lg-2 d-md-block sidebar">
      <div className="position-sticky">
        <h2 className="text-center py-3">🎓 LMS</h2>
        <ul className="nav flex-column">
          <li className="nav-item"><button className="nav-link" onClick={() => navigate("/dashboard")}>📊 Dashboard</button></li>
          <li className="nav-item"><button className="nav-link" onClick={() => navigate("/courses")}>📚 Courses</button></li>
          <li className="nav-item"><button className="nav-link" onClick={() => navigate("/assessments")}>📝 Assessments</button></li>
          <li className="nav-item"><button className="nav-link" onClick={() => navigate("/messages")}>💬 Messages</button></li>
          <li className="nav-item"><button className="nav-link" onClick={() => navigate("/forum")}>💻 Discussion Forum</button></li>
          <li className="nav-item"><button className="nav-link" onClick={() => navigate("/calendar")}>📅 Calendar</button></li>
          {role === "admin" && <li className="nav-item"><button className="nav-link" onClick={() => navigate("/analytics")}>📈 Analytics</button></li>}
          <li className="nav-item"><button className="nav-link" onClick={() => navigate("/profile")}>👤 Profile</button></li>
          <li className="nav-item"><button className="nav-link" onClick={() => navigate("/settings")}>⚙️ Settings</button></li>
          <li className="nav-item"><button className="nav-link" onClick={() => navigate("/support")}>❓ Help & Support</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
