import React, { useState, useEffect } from "react";
import "./testimaonianls.css"; // Import your CSS file

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch testimonials data from the API
    fetch(
      "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
    )
      .then((response) => response.json())
      .then((data) => {
        // Check if data.testimonials is defined before setting testimonials state
        if (data.user.testimonials) {
          setTestimonials(data.user.testimonials);
          setLoading(false); // Set loading to false when data is fetched
        } else {
          console.error("Testimonials data is undefined:", data);
          setLoading(false); // Set loading to false in case of error
        }
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="testimonials">
      <div className="container px-5 py-10 mx-auto text-center">
        <h1 className="testimonials-title">Client Testimonials</h1>
        <div className="testimonials-list">
          {testimonials.map((testimonial) => (
            <div className="testimonial" key={testimonial._id}>
              <div className="testimonial-content">
                <img
                  alt="testimonial"
                  src={testimonial.image.url}
                  className="testimonial-image"
                />
                <p className="testimonial-review">{testimonial.review}</p>
                <div className="testimonial-details">
                  <span className="testimonial-name">{testimonial.name}</span>
                  <span className="testimonial-position">{testimonial.position}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
