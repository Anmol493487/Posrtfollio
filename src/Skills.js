import React, { useState, useEffect } from "react";
import "./Skills.css"; // Import your CSS file

export default function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Fetch skills data from the API
    fetch("your-api-endpoint")
      .then((response) => response.json())
      .then((data) => {
        // Set skills state with the fetched data
        setSkills(data.skills);
      })
      .catch((error) => {
        console.error("Error fetching skills:", error);
      });
  }, []);

  return (
    <section id="skills">
      <div className="container px-5 py-10 mx-auto">
        <div className="text-center mb-20">
          <h1 className="skills-title">Skills & Technologies</h1>
          <p className="skills-description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi sit
            ipsa delectus eum quo voluptas aspernatur accusantium distinctio
            possimus est.
          </p>
        </div>
        <div className="skills-list">
          {skills.map((skill) => (
            <div key={skill._id} className="skill">
              <div className="skill-content">
                <img
                  alt="skill"
                  src={skill.image.url}
                  className="skill-image"
                />
                <div className="skill-details">
                  <h2 className="skill-name">{skill.name}</h2>
                  <div className="skill-progress-bar">
                    <div
                      className="skill-progress"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                  <span className="skill-percentage">{skill.percentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
