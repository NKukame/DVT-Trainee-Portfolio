import "./CVProject.css";

export default function CVProject(props) {
  return (
    <>
      {props.user.projects.map((proj, index) => (
        <section className="generate-cv-projects" key={index}>
          <div className="generate-cv-project-background-container">
            <img
              className="generate-cv-project-background"
              src="/Cv_header.png"
              alt=""
            />
          </div>
          <div className="generate-cv-project-info">
            <div className="generate-cv-project-image">
              <img
                className="generate-cv-header-avatar"
                src={proj.project.screenshot}
                alt=""
              />
            </div>
            <div className="generate-cv-project-intro">
              <h1>{proj.project.name}</h1>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
