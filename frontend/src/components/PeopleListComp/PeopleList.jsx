import React, { useState, useEffect } from "react";
import Card from "../CardComp/Card"; // Import the Card component

const PeopleList = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("/team-info.json")
      .then((response) => response.json())
      .then((data) => setPeople(data))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  return (
    <div className="people-list">
      {people.map((person) => (
        <Card key={person.id} name={person.name} description={person.description} image={person.image} />
      ))}
    </div>
  );
};

export default PeopleList;
