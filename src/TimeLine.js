import React, { useState, useEffect } from "react";

export default function Timeline() {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch timeline data from the API
    fetch(
      "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
    )
      .then((response) => response.json())
      .then((data) => {
        // Check if data.timeline is defined before setting the state
        if (data.user.timeline) {
          setTimelineData(data.user.timeline);
          setLoading(false); // Set loading to false when data is fetched
        } else {
          console.error("Timeline data is undefined:", data);
          setLoading(false); // Set loading to false in case of error
        }
      })
      .catch((error) => {
        console.error("Error fetching timeline:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="timeline" className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-10 mx-auto text-center lg:px-40">
        <div className="flex flex-col w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-white">
            My Timeline
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {timelineData.map((event) => (
            <div className="p-4 md:w-1/2 w-full" key={event._id}>
              <div className="h-full bg-gray-800 bg-opacity-40 p-8 rounded">
                <h2 className="title-font font-medium text-white mb-2">
                  {event.company_name}
                </h2>
                <h3 className="text-indigo-400 mb-2">{event.jobTitle}</h3>
                <p className="leading-relaxed mb-6">{event.summary}</p>
                <div className="flex items-center flex-wrap ">
                  <span className="text-gray-500 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-600">
                    {new Date(event.startDate).toLocaleDateString()} -{" "}
                    {new Date(event.endDate).toLocaleDateString()}
                  </span>
                  <span className="text-gray-500 inline-flex items-center leading-none text-sm">
                    {event.jobLocation}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
