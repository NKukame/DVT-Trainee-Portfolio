import "./UserProfileSkillBreakdown.css";
import PolarChart from "../usedComps/PolarChart";
import HorizontalBarChart from "../usedComps/HorizontalBarChart";
function UserProfileSkillBreakdown(props) {
  const education = [
    {
      id: 1,
      degree: [
        "Bachelor of Science in Computer Science - University of California, Berkeley",
        "Minor in Mathematics - University of California, Berkeley ",
      ],
      field: "Computer Science",
      startDate: "2014",
      endDate: "2018",
      certification: [
        "Certified JavaScript Developer - Udemy",
        "Certified React Developer - Coursera",
        "Certified HTML Developer - Udemy",
        "Certified CSS Developer - Coursera",
        "Certified Python Developer - Udemy",
        "Certified Node.js Developer - Coursera",
        "Certified Express.js Developer - Udemy",
        "Certified MongoDB Developer - Coursera",
        "Certified SQL Developer - Udemy",
        "Certified Git and GitHub Developer - Coursera",
      ],
    },
  ];
  return (
    <>
      <section className="skills-breakdown-section">
        <h1 className="skills-header">Skills Breakdown </h1>
        <section className="skills-education-section">
          <h2 className="skills-education-header">Education</h2>
          {props.testEmployee.emp_education ? (
               (
                <div className="skills-education-item">
                  <div>
                    <p className="skills-education-item-title">
                      Formal Education
                    </p>
                    <ul>
                      {
                        <li>{props.testEmployee.emp_education.qualification + ' - ' + props.testEmployee.emp_education.institution}</li>
                      }
                    </ul>
                  </div>
                  {/* <div>
                    <p className="skills-education-item-title">
                      Certifications
                    </p>
                    <ul>
                      TO BE CONTINUED
                        <li>{}</li>
                      
                    </ul>
                  </div> */}
                </div>
              )
            
          ) : (
            <p>No education data available</p>
          )}
        </section>
        <hr />
        <section className="skills-circle-section">
          <h2 className="skills-circle-header">Soft skills</h2>
          <p className="skills-circle">
            <PolarChart user={props.testEmployee}/>
          </p>
        </section>
        <hr />
        <section className="skills-bar-section">
          <h2 className="skills-bar-header">Skills Metrics</h2>
          <div className="skills-bar-graph">
            <HorizontalBarChart user={props.testEmployee}/>
          </div>
        </section>
      </section>
    </>
  );
}

export default UserProfileSkillBreakdown;
