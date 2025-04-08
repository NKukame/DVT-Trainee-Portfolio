import "./styles.css";
import "./Portfolio.css";
import Header from "./components/Header";
import CarouselView from "./components/CarouselView";
import GridView from "./components/GridView";
import { Link } from "react-router-dom";
import UserProfile from "./UserPortfolio";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SideBar from "./components/SideBar";
import React, { useState, useEffect } from "react";

function Portfolio() {
  const [team, setTeam] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState("card-view");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState(""); // New search state

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

  return (
    <>
      <div className="app-layout">
        <SideBar />

        <div className="app-layout-body">
          <div className="portfolio-body">
            <section className="Intro">
              <p className="theTitle">Portfolio</p>

              <div className="view-filter">
                <select
                  name="view-mode"
                  id="view-mode"
                  className="custom-dropdown"
                  onChange={handleViewChange}
                >
                  <option value="card-view">Card</option>
                  <option value="grid-view">Grid</option>
                  <option value="carousel-view">Carousel</option>
                </select>

                {viewMode === "card-view" && (
                  <button className="sort-button" onClick={toggleSort}>
                    Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
                  </button>
                )}
              </div>
            </section>

            {viewMode === "carousel-view" ? (
              <CarouselView />
            ) : viewMode === "grid-view" ? (
              <GridView team={filteredAndSortedTeam} />
            ) : (
              <section className="cards">
                <div className="carousel">
                  <button
                    className="carousel-navigation prev"
                    onClick={handlePrev}
                  >
                    &#10094;
                  </button>
                  {filteredAndSortedTeam.length > 0 ? (
                    <div className="portfolio-card">
                      <button className="mail">
                        <EmailOutlinedIcon fontSize="large" />
                      </button>

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
                          <span className="about-me">
                            {filteredAndSortedTeam[currentIndex].techStack}
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
                                filteredAndSortedTeam[currentIndex].linkedin ||
                                "/"
                              }
                            >
                              <LinkedInIcon
                                className="social-links"
                                fontSize="large"
                              />
                            </Link>
                          </div>
                          <button className="button">Contact Me</button>
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
                    &#10095;
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Portfolio;
