import "./styles.css";
import "./Portfolio.css";
import Header from "./components/Header";
import CarouselView from "./components/CarouselView";
import GridView from "./components/GridView";  // New Grid View Component
import { Link } from "react-router-dom";
import UserProfile from "./UserPortfolio";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import React, { useState, useEffect } from "react";

function Portfolio() {
    const [team, setTeam] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewMode, setViewMode] = useState("card-view"); // Manages all views

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

    if (team.length === 0) return <p>Loading...</p>;

    const member = team[currentIndex];

    // Handle view change
    const handleViewChange = (event) => {
        setViewMode(event.target.value);
    };

    return (
        <>
            <Header />
            <section className="Intro">
                <p className="theTitle">Portfolio</p>
                <div className="search">
                    <i className="bi bi-search"></i>
                    <input type="text" id="searchInput" placeholder="  Search" />
                </div>

                <div className="view-filter">
                    <select name="view-mode" id="view-mode" className="custom-dropdown" onChange={handleViewChange}>
                        <option value="card-view">Card</option>
                        <option value="grid-view">Grid</option>
                        <option value="carousel-view">Carousel</option>
                    </select>
                </div>
            </section>

            {/* Render views based on viewMode */}
            {viewMode === "carousel-view" ? (
                <CarouselView />
            ) : viewMode === "grid-view" ? (
                <GridView team={team} />
            ) : (
                <section className="cards">
                    <div className="carousel">
                        <button className="carousel-navigation prev" onClick={handlePrev}>&#10094;</button>
                        <div className="portfolio-card">
                            <button className="mail">
                                <EmailOutlinedIcon fontSize="large"/>
                            </button>

                            <Link to="/UserPortfolio">
                                <div className="profile-pic" 
                                style={{ backgroundImage: `url(${member.image})` }}>
                                </div>
                            </Link>

                            <div className="bottom">
                                <div className="content">
                                    <span className="name">{member.name}</span>
                                    <span className="about-me">{member.description}</span>
                                    <span className="about-me">{member.techStack}</span>
                                </div>
                                <div className="bottom-bottom">
                                    <div className="social-links-container">
                                        <Link to="/">
                                            <GitHubIcon className="social-links" fontSize="large"/>
                                        </Link>

                                        <Link to="/">
                                            <LinkedInIcon className="social-links" fontSize="large"/>
                                        </Link>
                                        
                                    </div>
                                    <button className="button">Contact Me</button>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-navigation next" onClick={handleNext}>&#10095;</button>
                    </div>                
                </section>
            )}
        </>
    );
}

export default Portfolio;
