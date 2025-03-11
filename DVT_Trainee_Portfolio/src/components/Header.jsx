import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Header.css'
import dvtLogo from "../assets/dvt_logo.jpg";
import homeIcon from "../assets/icons8-home-100.png";
import menuIcon from "../assets/icons8-menu-100.png";
import supportIcon from "../assets/icons8-support-100.png";
import darkModeIcon from "../assets/icons8-moon-100.png";
import logOutIcon from "../assets/icons8-log-out-100.png";

function Header(){
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle sidebar visibility
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "enabled";
    });

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
        }
    }, [darkMode]);

    return(
        <header className='header'>
            <div className='logo'>
                <img src={dvtLogo} alt="Logo" />
                <div className='logo-text'>Development <br /> <span className='yellow-text'>Trainee</span></div>
            </div>

            <nav className="navbar">
                <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
                    <img src={homeIcon} alt="Home Icon" className="icon home-icon" />
                </Link>

                <Link to="/login" className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}>
                    Login
                </Link>

                <Link to="/portfolio" className={`nav-link ${location.pathname === "/portfolio" ? "active" : ""}`}>
                    Portfolio
                </Link>

                <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}>
                    About
                </Link>

                <Link to="/search" className={`nav-link ${location.pathname === "/search" ? "active" : ""}`}>
                    Search
                </Link>
            </nav>


            <div className="menu" onClick={toggleSidebar}>
                <img src={menuIcon} alt="Menu Icon" className="icon"/>
            </div>

            <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
                <button className="close-btn" onClick={toggleSidebar}>X</button>

                <div className="sidebar-content">
                    <img src={supportIcon} alt="" className="sidebar-logo"/>
                    <h2>Support</h2>
                </div>

                <div className={` ${darkMode ? "dark-mode-enabled" : ""}`}>
                    <label htmlFor="switch" className={`switch ${darkMode ? "dark-mode-enabled" : ""}`}>
                        <input
                            type="checkbox"
                            id="switch"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                        />
                        <div className="toggle"></div>
                        <div className="names">
                            <p className="light">Light</p>
                            <p className="dark">Dark</p>
                        </div>
                    </label>
                </div>

                <div className="log-out">
                
                    <button class="logout-btn">
                    
                        <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                    
                        <div class="text">Logout</div>
                    </button>

                </div>

            </div>
        </header>
    );
}

export default Header;