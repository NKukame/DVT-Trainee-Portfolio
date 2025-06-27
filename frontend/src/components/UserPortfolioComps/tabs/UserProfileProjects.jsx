import ClientCarousel from "../usedComps/ClientCarousel";
import { useState, useEffect } from "react";
import "./UserProfileProjects.css";
import { use } from "react";
import { useSearch } from "../../../contexts/SearchContext";
function UserProfileProjects(props) {

 const [,,,,,,,, projectsWithTechStackNames] = useSearch(); 
const [empProject, setEmpProject] = useState([]);

 useEffect(() => {
  const userProject = projectsWithTechStackNames.filter( project => {
    return project.username === props.testEmployee.name;
  })
  setEmpProject(userProject)
 },[projectsWithTechStackNames]);



  const projects = [
    {
      name: "Scientific Calculator",
      datePublished: "20 Nov 2024",
      image: './src/assets/Gomo.jpg',
      techStack: ["HTML", "CSS", "JavaScript"],
      profilePicture: "./src/assets/Sli.jpg",
      contributors: ["Bob Johnson", "Alice Smith"],
      description: "A scientific calculator with advanced features.",
      liveDemo: "https://example.com/demo",
      sourceCode: "https://github.com/example/scientific-calculator",
    },
    {
      name: "Portfolio Website",
      datePublished: "20 Nov 2024",
      image: "./src/assets/Gomo.jpg",
      techStack: ["React", "CSS"],
      profilePicture: "./src/assets/Sli.jpg",
      contributors: ["John Doe"],
      description: "A personal portfolio website showcasing projects.",
      liveDemo: "https://example.com/portfolio",
      sourceCode: "https://github.com/example/portfolio",
    },
    {
      name: "E-commerce App",
      datePublished: "20 Nov 2024",
      image: "./src/assets/Gomo.jpg",
      profilePicture: "./src/assets/Sli.jpg",
      techStack: ["Node.js", "Express", "MongoDB"],
      contributors: ["Jane Doe"],
      description: "A full-stack e-commerce platform with user authentication.",
      liveDemo: "https://example.com/ecommerce",
      sourceCode: "https://github.com/example/ecommerce",
    },
    {
      name: "Scientific Calculator",
      datePublished: "20 Nov 2024",
      image: "./src/assets/Gomo.jpg",
      profilePicture: "./src/assets/Sli.jpg",
      techStack: ["HTML", "CSS", "JavaScript"],
      contributors: ["Bob Johnson", "Alice Smith"],
      description: "A scientific calculator with advanced features.",
      liveDemo: "https://example.com/demo",
      sourceCode: "https://github.com/example/scientific-calculator",
    },
    {
      name: "Portfolio Website",
      datePublished: "20 Nov 2024",
      image: "./src/assets/Gomo.jpg",
      profilePicture: "./src/assets/Sli.jpg",
      techStack: ["React", "CSS"],
      contributors: ["John Doe"],
      description: "A personal portfolio website showcasing projects.",
      liveDemo: "https://example.com/portfolio",
      sourceCode: "https://github.com/example/portfolio",
    },
    {
      name: "E-commerce App",
      datePublished: "20 Nov 2024",
      image: "./src/assets/Gomo.jpg",
      profilePicture: "./src/assets/Sli.jpg",
      techStack: ["Node.js", "Express", "MongoDB"],
      contributors: ["Jane Doe"],
      description: "A full-stack e-commerce platform with user authentication.",
      liveDemo: "https://example.com/ecommerce",
      sourceCode: "https://github.com/example/ecommerce",
    },
    {
      name: "Scientific Calculator",
      datePublished: "20 Nov 2024",
      image: "./src/assets/Gomo.jpg",
      profilePicture: "./src/assets/Sli.jpg",
      techStack: ["HTML", "CSS", "JavaScript"],
      contributors: ["Bob Johnson", "Alice Smith"],
      description: "A scientific calculator with advanced features.",
      liveDemo: "https://example.com/demo",
      sourceCode: "https://github.com/example/scientific-calculator",
    },
    {
      name: "Portfolio Website",
      datePublished: "20 Nov 2024",
      image: "./src/assets/Gomo.jpg",
      profilePicture: "./src/assets/Sli.jpg",
      techStack: ["React", "CSS"],
      contributors: ["John Doe"],
      description: "A personal portfolio website showcasing projects.",
      liveDemo: "https://example.com/portfolio",
      sourceCode: "https://github.com/example/portfolio",
    },
    {
      name: "E-commerce App",
      datePublished: "20 Nov 2024",
      image: "./src/assets/Gomo.jpg",
      profilePicture: "./src/assets/Sli.jpg",
      techStack: ["Node.js", "Express", "MongoDB"],
      contributors: ["Jane Doe"],
      description: "A full-stack e-commerce platform with user authentication.",
      liveDemo: "https://example.com/ecommerce",
      sourceCode: "https://github.com/example/ecommerce",
    },
  ];
  return (
    <>
    <section className="client-section">
    <ClientCarousel />
    </section>
      <h1 className="profile-projects-title">Projects</h1>

      <main className="project-content">
        <section className="project-grid-content">
          {empProject.map((project, index) => (
            <div className="project-grid-item" key={index}>
              <p className="profile-project-name">{project.name }</p>
              <p>{project.created_on }</p>
              <img className="profile-project-image" src={project.screenshot } alt={project.name} />
                    <ul className='proficiency-list'>
                        {project.techStack.map((tech, index) => (
                            <li key={index} className='project-tag'>{tech}</li>
                        ))}
                        
                    </ul>
              <div className="profile-account">
                {/* <img className="profile-account-image" src={project.avatar} alt="" />      
              <p>{project.username }</p> */}
              </div>
              <button className='manage-prfl'>View Project</button>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

export default UserProfileProjects;
