import { Link } from "react-router-dom";
import "./SideBar.css";
import dvtLogo from "../assets/dvt_logo.jpg";
import profileIcon from "../assets/placeholder.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LoginIcon from "@mui/icons-material/Login";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";

function SideBar() {
  return (
    <>
      <div className="sidebar-container">

        <div className="sidebar-container-logo">
          <img src={dvtLogo} alt="DVT Logo" className="sidebar-logo" />
          <div className="logo-txt">Smart People <br /> <span className="logo-txt">Smart Solutions</span></div>
        </div>

        <div className="sidebar-container-content">
          <div className="sidebar-nav-link">
            <Link to="/">
              <div className="homeBtn">
                <HomeOutlinedIcon fontSize="large" />
                <p className="home-txt">Home</p>
              </div>
            </Link>
          </div>

          <div className="sidebar-nav-link">
            <Link to="/login">
              <div className="homeBtn">
                <LoginIcon fontSize="large" />
                <p className="home-txt">Login</p>
              </div>
            </Link>
          </div>

          <div className="sidebar-nav-link">
            <Link to="/portfolio">
              <div className="homeBtn">
                <FolderSharedOutlinedIcon fontSize="large" />
                <p className="home-txt">Profile</p>
              </div>
            </Link>
          </div>

          <div className="sidebar-nav-link">
            <Link to="/about">
              <div className="homeBtn">
                <InfoOutlinedIcon fontSize="large" />
                <p className="home-txt">About</p>
              </div>
            </Link>
          </div>

          <div className="sidebar-nav-link">
            <Link to="/search">
              <div className="homeBtn">
                <SearchOutlinedIcon fontSize="large" />
                <p className="home-txt">Search</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="sidebar-bottom">

            <div className="log-out">
                
                <button class="logout-btn">
                
                    <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                
                    <div class="text">Logout</div>
                </button>

            </div>

        </div>

      </div>
    </>
  );
}

export default SideBar;
