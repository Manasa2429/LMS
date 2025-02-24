import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css"; // Ensure CSS is imported

const PersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID not found. Please log in again.");
      return;
    }

    axios
      .get(`http://localhost:5000/api/profile/personal-info/${userId}`)
      .then((response) => setPersonalInfo(response.data))
      .catch((error) => {
        console.error("Error fetching personal info:", error);
        setError("Failed to load personal info.");
      });
  }, []);

  return (
    <div className="personal-info-wrapper">
      <div className="personal-info-container">
        <h2>Personal Info</h2>
        {error && <p className="personal-info-error">{error}</p>}
        {personalInfo ? (
          <div>
            <p><strong>Full Name:</strong> {personalInfo.fullName}</p>
            <p><strong>Email:</strong> {personalInfo.email}</p>
            <p><strong>Phone:</strong> {personalInfo.phone}</p>
            <p><strong>Date of Birth:</strong> {personalInfo.dob}</p>
            <p><strong>Gender:</strong> {personalInfo.gender}</p>
            <p><strong>Role:</strong> {personalInfo.role}</p>
          </div>
        ) : !error ? (
          <p className="personal-info-loading">Loading...</p>
        ) : null}
      </div>
    </div>
  );
};

export default PersonalInfo;
