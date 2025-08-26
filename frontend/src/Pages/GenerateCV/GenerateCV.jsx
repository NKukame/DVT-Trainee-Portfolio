import { useLocation } from "react-router";
import React, { useState } from "react";
import { usePDF } from "react-to-pdf";
import { Star, Calendar1, MapPin, Award } from "lucide-react";
import CVHorizontalBarChart from "../../components/GenerateCVComps/CVHorizontalBarChart";
import CVPolarChart from "../../components/GenerateCVComps/CVPolarChart";
import CVProject from "../../components/GenerateCVComps/CVProject";

function GenerateCV() {
  const location = useLocation();
  const { toPDF, targetRef } = usePDF({
    filename: `${location.state.name}-CV.pdf`,
  });
  return (
    <>
      <section className="generate-cv-container">
        <div className="generate-cv-content-container" ref={targetRef}>
          <section className="first-page">
            <header className="generate-cv-content-container-header">
              <img
                className="generate-cv-header-background"
                src="/Cv_header.png"
                alt=""
              />

              <div className="generate-cv-content-avatar">
                <img
                  className="generate-cv-header-avatar"
                  src={location.state.avatar}
                  alt=""
                />
              </div>
              <div className="generate-cv-content-text">
                <h1>{location.state.name}</h1>
                <p>{location.state.role}</p>
              </div>
              <div className="generate-cv-content-logo">
                <img
                  className="generate-cv-header-background"
                  src="/DVT_Icon-Circle_White_(RGB) 1.png"
                  alt=""
                />
              </div>
            </header>

            <article className="generate-cv-content-article">
              <div className="generate-cv-contet-bio">
                <ul>
                  <li>{location.state.bio}</li>
                </ul>
              </div>

              {location.state.career.length > 0 && (
                <div className="generate-cv-content-career-chronology">
                  <h2>Career</h2>
                  {location.state.career.length > 0 ? (
                    location.state.career.map((e, i) => (
                      <div key={i} className="generate-cv-stepper-box">
                        <div className="generate-cv-stepper-step">
                          <div className="generate-cv-stepper-circle">
                            {e.duration.split("-")[1]}
                          </div>
                          <div className="generate-cv-stepper-line" />
                          <div className="generate-cv-stepper-content">
                            <div className="generate-cv-stepper-title">
                              {e.role}
                            </div>
                            <div className="generate-cv-stepper-status">
                              {e.company}
                            </div>
                            <div className="generate-cv-stepper-time">
                              {e.duration}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="generate-cv-stepper-title">No Career</div>
                  )}
                </div>
              )}

              <div className="generate-cv-content-skills-matrix">
                <h2>Skills Matrix</h2>
                <div className="generate-cv-content-skills-matrix-chart">
                  <CVHorizontalBarChart user={location.state} />
                </div>
              </div>
            </article>
          </section>
          {location.state.projects && location.state.projects.length > 0 && (
            <section className="second-page">
              <CVProject user={location.state} />
            </section>
          )}

          <aside
            className={
              location.state.projects && location.state.projects.length > 0
                ? "generate-cv-sidebar"
                : "generate-cv-sidebar-first-page"
            }
          >
            <div className="generate-cv-sidebar-item">
              <div className="generate-cv-sidebar-item-pairing">
                <Star className="generate-cv-sidebar-item-icon" size={15} />
                <p>{location.state.department}</p>
              </div>
              <div className="generate-cv-sidebar-item-pairing">
                <Calendar1
                  className="generate-cv-sidebar-item-icon"
                  size={15}
                />
                <p>
                  {location.state.availability ? "Available" : "Not Available"}
                </p>
              </div>
              <div className="generate-cv-sidebar-item-pairing">
                <MapPin className="generate-cv-sidebar-item-icon" size={15} />
                <p>{location.state.location}</p>
              </div>
              <div className="generate-cv-sidebar-item-pairing">
                <Award className="generate-cv-sidebar-item-icon" size={15} />
                <p>
                  {location.state.experienced
                    ? location.state.experienced
                    : "N/A"}{" "}
                  Experience
                </p>
              </div>
            </div>

            <div className="generate-cv-education-section">
              <div className="generate-cv-education-items">
                <h2>Education</h2>
                <ul>
                  {(Array.isArray(location.state.emp_education)
                    ? location.state.emp_education
                    : [location.state.emp_education]
                  ).map((edu, idx) => (
                    <li key={idx}>
                      {edu.qualification} - {edu.institution}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="generate-cv-education-items">
                <h2>Certificates</h2>
                <ul>
                  {location.state.certificates.map((cert, idx) => (
                    <li key={idx}>
                      {cert.name} - {cert.institution}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="generate-cv-education-items">
                <h2>Industry</h2>
                <ul>
                  {(() => {
                    const industries = [
                      ...new Set(
                        location.state.projects.flatMap((proj) =>
                          proj.project.industries.flatMap((ind) =>
                            ind.project.industries.map(
                              (item) => item.industry.name,
                            ),
                          ),
                        ),
                      ),
                    ];
                    return industries.length > 0 ? (
                      industries.map((industry, idx) => (
                        <li key={idx}>{industry}</li>
                      ))
                    ) : (
                      <li>N/A</li>
                    );
                  })()}
                </ul>
              </div>
              <div className="generate-cv-education-items">
                <h2>Soft Skills</h2>
                <div className="generate-cv-education-items-soft-skills">
                  <CVPolarChart user={location.state} />
                </div>
              </div>
            </div>
          </aside>
        </div>
        <button className="download-pdf" onClick={() => toPDF()}>
          Download PDF
        </button>
      </section>
    </>
  );
}

export default GenerateCV;

