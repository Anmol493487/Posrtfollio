import React, { useState, useEffect } from "react";
import "./Project.css"; // Import your CSS file

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch projects data from the API
    fetch(
      "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
    )
      .then((response) => response.json())
      .then((data) => {
        // Check if data.projects is defined before sorting and setting projects state
        if (data.user.projects) {
          // Sort projects based on the sequence
          const sortedProjects = data.user.projects.sort(
            (a, b) => a.sequence - b.sequence
          );
          setProjects(sortedProjects);
          setLoading(false); // Set loading to false when data is fetched
        } else {
          console.error("Projects data is undefined:", data);
          setLoading(false); // Set loading to false in case of error
        }
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="projects" className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-10 mx-auto text-center lg:px-40">
        <div className="flex flex-col w-full mb-20">
          <h1 className="projects-title">Apps I've Built</h1>
          <p className="projects-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
            facilis repellat ab cupiditate alias vero aliquid obcaecati quisquam
            fuga dolore.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {projects.map((project) => (
            <a
              href={project.liveurl} // Assuming liveurl is the URL for live project
              key={project._id}
              className="project-link"
            >
              <div className="project-card">
                <img
                  alt="gallery"
                  className="project-image"
                  src={project.image.url} // Assuming image.url is the URL for project image
                />
                <div className="project-details">
                  <h2 className="project-title">{project.title}</h2>
                  <p className="project-description">{project.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
