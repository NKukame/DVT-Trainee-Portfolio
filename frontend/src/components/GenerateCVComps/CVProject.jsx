import "./CVProject.css";

function getRandomPastDate() {
  const end = new Date();
  const start = new Date(2020, 0, 1); // You can adjust the earliest year if needed
  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  const randomDate = new Date(randomTime);
  // Format as "DD MMMM YYYY"
  return randomDate.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}

export default function CVProject(props) {
  let checkIn = props.user?.projects || [];
  const answer = []
  for(let index = 0; index < Math.min(2, checkIn.length); index++) {
    if (checkIn[index]) {
      answer.push(checkIn[index])
    }
  }
  return (
    <>
      {answer.map((proj, index) => ( 
        <section className="generate-cv-projects" key={index}>
          <section className="generate-cv-projects-header">
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
                  className="generate-cv-header-project-screenshot"
                  src={proj.project.screenshot}
                  alt=""
                />
              </div>
              <div className="generate-cv-project-intro">
                <h1>{proj.project.name}</h1>
                <p>{getRandomPastDate()}</p>
              </div>
            </div>
          </section>
          <section className="generate-cv-project-tech-stack">

            <aside className="generate-cv-project-aside-list">
              <h2>Tech Stack</h2>
              <ul>
                {
                  (proj.project?.techStack || []).map((tech, index) => (
                    <li key={index} className="generate-cv-project-tech-stack-list">{tech?.techStack?.name || 'Unknown'}</li>))
                }
              </ul>
            </aside>
            <section className="generate-cv-project-description">
                <h2>Description</h2>
                <p>{proj.project.description}</p>
            </section>
          </section>
          
        </section>
      ))}
    </>
  );
}
