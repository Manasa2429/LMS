import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Assessments = ({ role }) => {
    const navigate = useNavigate(); // React Router navigation

    const assessmentItems = [
      { title: "📝 Ongoing Assessments", desc: "View and complete active assessments.", path: "/assessments/ongoing" },
      { title: "✅ Completed Assessments", desc: "Review your past submissions and scores.", path: "/assessments/completed" },
      { title: "📊 Performance Analytics", desc: "Analyze your strengths and areas for improvement.", path: "/assessments/analytics" },
    ];
  
    if (role === "instructor") {
      assessmentItems.push({ title: "📌 Create New Assessment", desc: "Design and assign assessments to students.", path: "/assessments/create" });
    }
  
    return (
      <section className="container mt-5">
        <h1 className="text-center">Assessments</h1>
        <div className="row">
          {assessmentItems.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text flex-grow-1">{item.desc}</p>
                  <button 
                    className="btn btn-primary mt-auto" 
                    onClick={() => navigate(item.path)}
                  >
                    {role === "instructor" && item.title.includes("Create") ? "Create Now" : "View Details"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
};

export default Assessments;
