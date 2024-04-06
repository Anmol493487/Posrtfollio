import React, { useState, useEffect } from "react";
import "./Social.css"; // Import your CSS file

export default function SocialMedia() {
  const [socialMediaData, setSocialMediaData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch social media data from the API
    fetch(
      "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
    )
      .then((response) => response.json())
      .then((data) => {
        // Check if data.social_handles is defined before setting the state
        if (data.user.social_handles) {
          setSocialMediaData(data.user.social_handles);
          console.log(data.user.social_handles);
          setLoading(false); // Set loading to false when data is fetched
        } else {
          console.error("Social media data is undefined:", data);
          setLoading(false); // Set loading to false in case of error
        }
      })
      .catch((error) => {
        console.error("Error fetching social media data:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="social-media" className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-10 mx-auto text-center lg:px-40">
        <div className="flex flex-col w-full mb-20">
          <h1 className="social-media-title">Social Media Handles</h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {socialMediaData.map((socialMedia) => (
            <div className="social-media-card" key={socialMedia._id}>
              <div className="social-media-content">
                <img
                  src={socialMedia.image.url}
                  alt={socialMedia.platform}
                  className="social-media-image"
                />
                <h2 className="social-media-platform">{socialMedia.platform}</h2>
                <a
                  href={socialMedia.url}
                  className="social-media-url"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {socialMedia.url}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
