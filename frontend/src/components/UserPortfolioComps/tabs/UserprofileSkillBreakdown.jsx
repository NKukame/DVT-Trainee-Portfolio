import "./UserProfileSkillBreakdown.css";
import PolarChart from "../usedComps/PolarChart";
import HorizontalBarChart from "../usedComps/HorizontalBarChart";
function UserProfileSkillBreakdown(props) {
 
  return (
    <>
      <section className="skills-breakdown-section">
        <h1 className="skills-header">Skills Breakdown </h1>
        <section className="skills-education-section">
          <h2 className="skills-education-header">Education</h2>
          {(() => {
            const education = props.testEmployee?.education || props.testEmployee?.emp_education || [];
            return Array.isArray(education) && education.length > 0 ? (
              <div className="skills-education-item">
                <div>
                  <p className="skills-education-item-title">Formal Education</p>
                  <ul>
                    {education.map((edu, idx) => (
                      <li key={idx}>
                        {edu?.qualification || 'N/A'} - {edu?.institution || 'N/A'}
                      </li>
                    ))}
                  </ul>
                </div>
              {Array.isArray(props.testEmployee?.certificates) &&
                props.testEmployee.certificates.length > 0 && (
                  <div>
                    <p className="skills-education-item-title">
                      Certifications
                    </p>
                    <ul>
                      {props.testEmployee.certificates.map((cert, idx) => (
                        <li key={idx}>
                          {cert?.name || 'N/A'} - {cert?.institution || 'N/A'}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p>No education data available</p>
            );
          })()}
        </section>
        <hr />
        <section className="skills-circle-section">
          <h2 className="skills-circle-header">Soft skills</h2>
          <p className="skills-circle">
            <PolarChart user={props.testEmployee} />
          </p>
        </section>
        <hr />
        <section className="skills-bar-section">
          <h2 className="skills-bar-header">Skills Metrics</h2>
          <div className="skills-bar-graph">
            <HorizontalBarChart user={props.testEmployee} />
          </div>
        </section>
      </section>
    </>
  );
}

export default UserProfileSkillBreakdown;
