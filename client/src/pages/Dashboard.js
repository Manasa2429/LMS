import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../App.css";

const Dashboard = ({ role }) => {
    const navigate = useNavigate(); // React Router navigation

    const dashboardItems = [
        { title: "📚 My Courses", desc: "View and manage your enrolled courses.", path: "/courses" },
        { title: "📝 Assignments", desc: "Check and submit your assignments on time.", path: "/assessments" },
        { title: "📅 Upcoming Events", desc: "Stay updated with important dates and schedules.", path: "/calendar" },
        { title: "📊 Progress Report", desc: "Track your learning progress and performance.", path: "/analytics" },
    ];

    if (role === "admin") {
        dashboardItems.push({ title: "👥 Manage Users", desc: "Add, edit, or remove users from the system.", path: "/manage-users" });
    }

    return (
        <section className="container mt-5">
            <h1 className="text-center">
                {role === "admin" ? "Admin Dashboard" : role === "instructor" ? "Instructor Dashboard" : "Student Dashboard"}
            </h1>
            <div className="row">
                {dashboardItems.map((item, index) => (
                    <div key={index} className="col-lg-4 col-md-6 mb-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text flex-grow-1">{item.desc}</p>
                                <button 
                                    className="btn btn-primary mt-auto"
                                    onClick={() => navigate(item.path)} // Navigate dynamically
                                >
                                    Go to {item.title.split(" ")[1]}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Dashboard;
