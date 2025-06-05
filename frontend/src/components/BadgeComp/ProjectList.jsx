import React from "react";
import Projects from "/src/Projects.jsx";

function ProjectList() {
  const projects = [
    {
      name: "Scientific Calculator",
      techStack: ["HTML", "CSS", "JavaScript"],
      contributors: ["Bob Johnson", "Alice Smith"],
      description: "A scientific calculator with advanced features.",
      liveDemo: "https://example.com/demo",
      sourceCode: "https://github.com/example/scientific-calculator",
    },
    {
      name: "Portfolio Website",
      techStack: ["React", "CSS"],
      contributors: ["John Doe"],
      description: "A personal portfolio website showcasing projects.",
      liveDemo: "https://example.com/portfolio",
      sourceCode: "https://github.com/example/portfolio",
    },

    {
      name: "Weather App",
      techStack: ["React", "API"],
      contributors: ["Jane Doe"],
      description: "A weather application that fetches data from an API.",
      liveDemo: "https://example.com/weather-app",
      sourceCode: "https://github.com/example/weather-app",
    }
    // Add more projects as needed
  ];

  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <Projects key={index} project={project} />
      ))}
    </div>
  );
}

export default ProjectList;