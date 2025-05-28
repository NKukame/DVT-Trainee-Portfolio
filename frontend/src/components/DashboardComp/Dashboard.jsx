import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from '../../assets/icons8-profile-picture-100.png';
import Calender from '../../assets/icons8-calendar-100.png';
import Location from '../../assets/icons8-location-100.png';
import Medal from '../../assets/icons8-medal-100.png';
import Github from '../../assets/icons8-github-100.png';
import LinkedIn from '../../assets/icons8-linkedin-100.png';
import Email from '../../assets/icons8-email-100.png';
import './Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard">

            <div className="profile">


                <div className='profile-picture'>
                    <img src={ProfileImage} className='profile-img' alt="Profile" />
                </div>

                <div className="short-bio">
                    <h2>Paballo Thobei</h2>
                    <p><strong>Fullstack Developer Intern</strong></p>
                    <p>I like banana splits and things.</p>
                </div>

                <div className="profile-info">

                    <Link to='/ProfileForm'><button className='manage-prfl'>Manage Profile</button></Link>

                    <p><img src={Medal} alt='Role Icon' className="dashboard-icon" />2.5 years</p>
                    <p><img src={Calender} alt="Experience Icon" className="dashboard-icon" />Immediately</p>
                    <p><img src={Location} alt="Location Icon" className="dashboard-icon" />Johannesburg (flexible)</p>



                </div>
                <div className="proficiencies">
                    <h2>Proficiencies</h2>
                    <ul className='proficiency-list'>
                        <li className='tag'>Java</li>
                        <li className='tag'>Python</li>
                        <li className='tag'>C#</li>
                        <li className='tag'>HTML</li>
                        <li className='tag'>CSS</li>
                        {/* <li className='tag'>MongoDB</li> */}
                        <li className='tag'>SQLite</li>
                    </ul>
                </div>

            </div>
            <footer className='footer'>

                <Link to='https://github.com/pthobei'>
                    <img src={Github} alt="GitHub" className="socials" />
                </Link>

                <Link to="https://www.linkedin.com/in/paballo-thobei-2b532a27b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                    <img src={LinkedIn} alt="LinkedIn" className="socials" />
                </Link>

                <Link to="mailto: pthobei@dvtsoftware.com">
                    <img src={Email} alt="Email" className="socials" />
                </Link>

            </footer>
        </div>
    );
}

export default Dashboard;