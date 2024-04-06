import React, { useState, useEffect } from "react";
import "./Services.css"; // Import your CSS file

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch services data from the API
    fetch(
      "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
    )
      .then((response) => response.json())
      .then((data) => {
        // Set services state with the fetched data
        setServices(data.user.services);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  return (
    <section id="services" className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap -m-4">
          {services.map((service) => (
            <div key={service._id} className="service-card">
              <div className="service-content">
                <img
                  alt={service.name}
                  src={service.image.url}
                  className="service-image"
                />
                <h2 className="service-name">{service.name}</h2>
                <p className="service-description">{service.desc}</p>
                <div className="service-price">
                  <span className="price-label">Price: </span>
                  <span className="price-value">{service.charge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
