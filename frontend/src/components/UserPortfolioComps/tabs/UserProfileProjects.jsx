import "./UserProfileProjects.css";
function UserProfileProjects() {
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
      name: "E-commerce App",
      techStack: ["Node.js", "Express", "MongoDB"],
      contributors: ["Jane Doe"],
      description: "A full-stack e-commerce platform with user authentication.",
      liveDemo: "https://example.com/ecommerce",
      sourceCode: "https://github.com/example/ecommerce",
    },
  ];
  return (
    <>
      <h1 className="profile-projects-title">Projects</h1>

      <main className="project-content">
        <section className="grid-content">
          {projects.map((project, index) => (
            <div className="grid-item" key={index}>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

export default UserProfileProjects;
