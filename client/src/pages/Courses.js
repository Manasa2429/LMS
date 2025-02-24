import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../App.css";

const coursesData = [
    { title: "Web Development Basics", desc: "Learn HTML, CSS, and JavaScript fundamentals.", price: "₹4999", img: "web-development.jpg" },
    { title: "Data Science Fundamentals", desc: "Introduction to data analysis and visualization.", price: "₹5999", img: "data-science.jpg" },
    { title: "AI & ML Concepts", desc: "Explore machine learning and deep learning.", price: "₹6999", img: "ai-ml.jpg" },
    { title: "Full Stack Development", desc: "Master frontend and backend technologies.", price: "₹9999", img: "full-stack.jpg" },
    { title: "Cyber Security Essentials", desc: "Understand ethical hacking and security protocols.", price: "₹7999", img: "cyber-security.jpg" },
    { title: "Mobile App Development", desc: "Build mobile apps for Android and iOS.", price: "₹8999", img: "mobile-app.jpg" },
    { title: "Internet of Things (IoT)", desc: "Learn how IoT devices communicate.", price: "₹6999", img: "iot.jpg" },
    { title: "Deep Learning & Neural Networks", desc: "Advanced AI and neural network concepts.", price: "₹9999", img: "deep-learning.jpg" },
    { title: "Blockchain Technology", desc: "Decentralized applications and smart contracts.", price: "₹10999", img: "blockchain.jpg" },
];

const Courses = ({ role }) => {
    const navigate = useNavigate(); // React Router navigation

    return (
        <section className="container mt-5">
            <h1 className="text-center">Available Courses</h1>
            <div className="row">
                {coursesData.map((course, index) => (
                    <div key={index} className="col-lg-4 col-md-6 mb-4">
                        <div className="card h-100 shadow-sm">
                            <img src={course.img} alt={course.title} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text flex-grow-1">{course.desc}</p>
                                <p className="card-text"><strong>Price:</strong> {course.price}</p>
                                <button 
                                    className="btn btn-primary mt-auto"
                                    onClick={() => navigate(`/courses/${index}`)} // Navigate to course details
                                >
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {role === "instructor" && (
                <button 
                    className="btn btn-success mt-3"
                    onClick={() => navigate("/create-course")} // Navigate to course creation page
                >
                    ➕ Create New Course
                </button>
            )}
        </section>
    );
};

export default Courses;
