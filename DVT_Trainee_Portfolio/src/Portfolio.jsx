import "./styles.css";
import "./Portfolio.css";
import Header from "./components/Header";
import CarouselView from "./components/CarouselView";
import React, { useState, useEffect, useRef } from "react";
import GridView from "./components/GridView";
import { Link } from "react-router-dom";
import UserProfile from "./UserPortfolio";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SideBar from "./components/SideBar";
import { AArrowDown } from "lucide-react";
import { AArrowUp } from "lucide-react";

function Portfolio() {
  const [team, setTeam] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState("card-view");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState(""); // New search state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
  };

  const handleGridClick = () => {
    setViewMode("grid-view");
  };

  const handleCardClick = () => {
    setViewMode("card-view");
  };

  useEffect(() => {
    fetch("/team-portfolio.json")
      .then((response) => response.json())
      .then((data) => setTeam(data))
      .catch((error) => console.error("Error loading team data:", error));
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % team.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + team.length) % team.length);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleViewChange = (event) => {
    setViewMode(event.target.value);
  };

  const toggleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Apply search filter first, then sort
  const filteredAndSortedTeam = team
    .filter((member) => member.name.toLowerCase().includes(searchQuery))
    .sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

  if (team.length === 0) return <p>Loading...</p>;

  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="app-layout">
        <SideBar />

        <div className="app-layout-body">
          <div className="portfolio-body">
            <section className="people-intro">
              <h1 className="theTitle">Smart People</h1>
              <p className="peopleDescription">
                Our amazing intake of interns are being prepared by our most
                skilled engineers <br /> to deliver for the future
              </p>
            </section>

            <div className="selection-banner">
              <div className="people-view-container">
                <div
                  className={`people-view ${viewMode === "card-view" ? "active" : ""
                    }`}
                  onClick={handleCardClick}
                >
                  Card
                </div>
                <div
                  className={`people-view ${viewMode === "grid-view" ? "active" : ""
                    }`}
                  onClick={handleGridClick}
                >
                  Grid
                </div>
              </div>

              <div className="sort-button-container">
                <label htmlFor="#">Sort</label>
                <button className="sort-button" onClick={toggleSort}>
                  {sortOrder === "asc" ? <AArrowDown /> : <AArrowUp />}
                </button>
              </div>
            </div>

            <div className="portfolio-view-container">
              {viewMode === "grid-view" ? (
                <GridView
                  team={filteredAndSortedTeam}
                  key={sortOrder + searchQuery}
                />
              ) : (
                <section className="cards">
                  <div className="carousel">
                    <button
                      className="carousel-navigation prev"
                      onClick={handlePrev}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.146 4.146a.5.5 0 0 1 .708.708L6.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5z"
                        />
                      </svg>
                    </button>
                    {filteredAndSortedTeam.length > 0 ? (
                      <div className="portfolio-card">
                        <a
                          href={`mailto:${filteredAndSortedTeam[currentIndex].email || "/"}`}
                          className="mail"
                        >
                          <EmailOutlinedIcon fontSize="large" />
                        </a>

                        <Link to="/UserPortfolio">
                          <div
                            className="profile-pic"
                            style={{
                              backgroundImage: `url(${filteredAndSortedTeam[currentIndex].image})`,
                            }}
                          ></div>
                        </Link>

                        <div className="bottom">
                          <div className="content">
                            <span className="name">
                              {filteredAndSortedTeam[currentIndex].name}
                            </span>
                            <span className="about-me">
                              {filteredAndSortedTeam[currentIndex].description}
                            </span>
                            <span className="about-me tech-stack-portfolio">
                              {/* <label htmlFor="#" className="tech-label">Technologies</label> */}
                              <ul className="flex-row flex-wrap badge-list-white gap-10-px ">
                                {filteredAndSortedTeam[
                                  currentIndex
                                ]?.techStack?.map((tech, index) => (
                                  <li key={index}>
                                    <p className="badge-default">{tech}</p>
                                  </li>
                                ))}
                              </ul>
                            </span>
                          </div>
                          <div className="bottom-bottom">
                            <div className="social-links-container">
                              <Link
                                to={
                                  filteredAndSortedTeam[currentIndex].github ||
                                  "/"
                                }
                              >
                                <GitHubIcon
                                  className="social-links"
                                  fontSize="large"
                                />
                              </Link>

                              <Link
                                to={
                                  filteredAndSortedTeam[currentIndex]
                                    .linkedin || "/"
                                }
                              >
                                <LinkedInIcon
                                  className="social-links"
                                  fontSize="large"
                                />
                              </Link>
                            </div>
                            <button className="button" onClick={() => openModal()}>Contact Me</button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p>No results found</p>
                    )}
                    <button
                      className="carousel-navigation next"
                      onClick={handleNext}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.854 11.854a.5.5 0 0 1-.708-.708L9.293 8 6.146 4.854a.5.5 0 1 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5z"
                        />
                      </svg>
                    </button>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen &&  (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="contact-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="contact-modal-close" onClick={closeModal}>
              X
            </button>

            <div>
              <p>Name:</p>
              <p>{filteredAndSortedTeam[currentIndex].name}</p>
            </div>
            
            <div>
              <p>Email:</p>
              <p>{filteredAndSortedTeam[currentIndex].email}</p>
            </div>

            <div>
              <p>Chat:</p>
               <p>{filteredAndSortedTeam[currentIndex].Chat}</p>
            </div>

            <div>
              <p>Phone:</p>
              <p>{filteredAndSortedTeam[currentIndex].Phone}</p>
            </div>

            <div>
              <p>Location:</p>
              <p>{filteredAndSortedTeam[currentIndex].Location}</p>
            </div>

            <div>
              <p>Company:</p>
              <p>{filteredAndSortedTeam[currentIndex].Company}</p>
            </div>

            <div>
              <p>Department:</p>
              <p>{filteredAndSortedTeam[currentIndex].Department}</p>
            </div>

            <div>
              <p>Role:</p>
              <p>{filteredAndSortedTeam[currentIndex].Role}</p>
            </div>

            <div>
              <p>Birthday:</p>
              <p>{filteredAndSortedTeam[currentIndex].Birthday}</p>
            </div>
   
          </div>
        </div>
      )}
    </>
  );
}

export default Portfolio;
