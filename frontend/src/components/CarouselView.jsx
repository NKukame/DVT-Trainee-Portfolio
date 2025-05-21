import React, { useEffect, useState } from "react";
import "./CarouselView.css";

const CarouselView = () => {
  const [teamData, setTeamData] = useState([]);

  // Fetch JSON from public folder
  useEffect(() => {
    fetch("/team-portfolio.json")
      .then((response) => response.json())
      .then((data) => setTeamData(data))
      .catch((error) => console.error("Error fetching team data:", error));
  }, []);

  if (teamData.length === 0) {
    return <p>Loading team data...</p>;
  }

  return (
    <div className="carousel-wrapper">
      <div className="carousel-inner" style={{ "--quantity": teamData.length }}>
        {teamData.map((member, index) => (
          <div
            key={index}
            className="carousel-card"
            style={{
              "--index": index,
              "--color-card": getColor(index)
            }}
          >
            <div className="carousel-content">
                <h3>{member.name}</h3>
                <img src={member.image} alt="Profile" className="carousel-img"/>
                <p>{member.description}</p>
                <p>{member.techStack}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Function to generate color variations for cards
const getColor = (index) => {
  const colors = [
    "255, 0, 128",
    "137, 207, 240",
    "142, 37, 37",
    "190, 191, 197",
    "0, 0, 128",
    "255, 215, 0",
    "65, 74, 76",
    "212, 115, 212",
    "143, 0, 255"
    
  ];
  return colors[index % colors.length];
};

export default CarouselView;
