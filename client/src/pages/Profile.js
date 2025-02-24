import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../App.css";

const Profile = () => {
  const navigate = useNavigate(); // React Router navigation

  const profileData = [
    { title: "👤 Personal Info", desc: "View and edit your personal details.", path: "/profile/personal-info" },
    { title: "📚 Enrolled Courses", desc: "Check the list of your active courses.", path: "/profile/courses" },
    { title: "📊 Progress Report", desc: "Monitor your learning progress and achievements.", path: "/profile/progress" },
    { title: "🔒 Change Password", desc: "Update your account security settings.", path: "/profile/change-password" },
  ];

  return (
    <section className="container mt-5">
      <h1 className="text-center">Profile</h1>
      <div className="row">
        {profileData.map((data, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{data.title}</h5>
                <p className="card-text flex-grow-1">{data.desc}</p>
                <button className="btn btn-primary mt-auto" onClick={() => navigate(data.path)}>
                  Manage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Profile;
