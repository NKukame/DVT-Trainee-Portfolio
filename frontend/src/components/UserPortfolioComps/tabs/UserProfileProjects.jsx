import ClientCarousel from "../usedComps/ClientCarousel";
import { useState, useEffect, useContext } from "react";
import "./UserProfileProjects.css";
import { use } from "react";
import { SearchContext } from "../../../contexts/SearchContext";
function UserProfileProjects(props) {

 const {projectsWithTechStackNames} = useContext(SearchContext); 
const [empProject, setEmpProject] = useState([]);

 useEffect(() => {
  const userProject = projectsWithTechStackNames.filter( project => {
    return project.username === props.testEmployee.name;
  })
  setEmpProject(userProject)
 },[projectsWithTechStackNames]);



  return (
    <>
      <section className="client-section">
        <ClientCarousel />
      </section>
      <h1 className="profile-projects-title">Projects</h1>

      <main className="project-content">
        <section className="project-grid-content">
          {(props.testEmployee?.projects || []).map((proj, index) => (
            <div className="project-grid-item" key={index}>
              <p className="profile-project-name">{proj.project.name}</p>
              <p>{proj.project.createdAt.slice(0, 10)}</p>
              <img
                className="profile-project-image"
                src={
                  proj.project.screenshot === null
                    ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    : proj.project.screenshot
                }
                alt="Project image"
              />


              <ul className="proficiency-list">
                {Array.isArray(proj.project?.techStack) &&
                  proj.project.techStack.slice(0, 4).map((tech, idx) => (
                    <li key={idx} className="project-tag">
                      {tech.techStack?.name}
                    </li>
                  ))}
              </ul>


              <div className="profile-account">
                { (proj.project?.members?.length || 0) > 1 ?   (
                    <>
                      <img
                        className="profile-account-image"
                        src={proj.project.members?.[0]?.employee?.photoUrl === null ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" : props.testEmployee.avatar}
                        alt={proj.project.members?.[0]?.employee?.name || 'Team member'}
                      />
                      <p>{proj.project.members.length} More Collaborators</p>
                    </>
                  ): (
                    <>
                      <img
                        className="profile-account-image"
                        src={proj.project.members?.[0]?.employee?.photoUrl === null ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" : proj.project.members?.[0]?.employee?.photoUrl}
                        alt={proj.project.members?.[0]?.employee?.name || 'Team member'}
                      />
                      <p>{props.testEmployee.name} </p>
                    </>
                  )}
              </div>
              <button className="manage-prfl">View Project</button>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

export default UserProfileProjects;
