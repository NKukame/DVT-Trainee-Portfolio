import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from './assets/icons8-profile-picture-100.png';
import Calender from './assets/icons8-calendar-100.png';
import Location from './assets/icons8-location-100.png';
import Medal from './assets/icons8-medal-100.png';
import Github from './assets/icons8-github-100.png';
import LinkedIn from './assets/icons8-linkedin-100.png';
import Email from './assets/icons8-email-100.png';
import Tech from './assets/icons8-computer-100.png';
import './Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard">

            <div className="profile">


                <div className='profile-picture'>
                    <img src={ProfileImage} className='profile-img' alt="Profile" />
                </div>

                <div className="short-bio">
                    <h2>Full Name</h2>
                    <p>Role</p>
                    <p>I like banana splits and things.</p>
                </div>

                <div className="profile-info">

                    <Link to='/ProfileForm'><button className='manage-prfl'>Manage Profile</button></Link>

                    <p><img src={Medal} alt='Role Icon' className="icon" />Experience</p>
                    <p><img src={Calender} alt="Experience Icon" className="icon" /> Availability</p>
                    <p><img src={Location} alt="Location Icon" className="icon" /> Location</p>



                </div>
                <div className="proficiencies">
                    <h2>Proficiencies</h2>
                    <ul className='proficiency-list'>
                        <li className='tag'>Java</li>
                        <li className='tag'>Python</li>
                        <li className='tag'>React</li>
                        <li className='tag'>Node.js</li>
                        <li className='tag'>Express.js</li>
                        <li className='tag'>MongoDB</li>
                        <li className='tag'>SQL</li>
                    </ul>
                </div>

            </div>
            <footer className='footer'>
                <img src={Github} alt="GitHub" className="socials" />
                <img src={LinkedIn} alt="LinkedIn" className="socials" />
                <img src={Email} alt="Email" className="socials" />
            </footer>
        </div>
    );
}

export default Dashboard;