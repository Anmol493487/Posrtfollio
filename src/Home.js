import React, { useState, useEffect } from "react";
import Social from "./SocialMedia";
import "./Home.css"; // Import your CSS file

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from the API
    fetch(
      "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
    )
      .then((response) => response.json())
      .then((data) => {
        // Set user data state with the fetched data
        setUserData(data.user.about);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <section id="home" className="text-gray-400 bg-gray-400 body-font">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
            <div className="home-container">
              <img
                alt="Avatar"
                src={userData.avatar.url}
                className="avatar"
              />
              <h2 className="name">{userData.name}</h2>
              <p className="title">{userData.title}</p>
              <p className="subtitle">{userData.subTitle}</p>
              <p className="description">{userData.description}</p>
              <p className="quote">{userData.quote}</p>
              <p className="experience">{userData.exp_year} years of experience</p>
              <p className="address">{userData.address}</p>
              <p className="phone">{userData.phoneNumber}</p>
              <p className="email">{userData.contactEmail}</p>
            </div>
          </div>
        </div>
      </div>
      <Social />
    </section>
  );
}
