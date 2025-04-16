import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from './assets/icons8-profile-picture-100.png';
import Calender from './assets/icons8-calendar-100.png';
import Location from './assets/icons8-location-100.png';
import Medal from './assets/icons8-medal-100.png';
import Tech from './assets/icons8-computer-100.png';
import './Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard">
            
            <div className="profile">

                
                <div className='profile-picture'>
                <img src={ProfileImage} className='profile-img' alt="Profile" />
                </div>
                
                <div className="profile-info">
                    <h2>Full Name</h2>
                    <p><img src={Tech} alt="Tech placeholder" className="icon"/>Role</p>
                    
                    <p><img src={Medal} alt='Role Icon' className="icon"/>Experience</p>
                    <p><img src={Calender} alt="Experience Icon" className="icon" /> Availability</p>
                    <p><img src={Location} alt="Location Icon" className="icon" /> Location</p>

                    <Link to='/ProfileForm'><button className='manage-prfl'>Manage Profile</button></Link>

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
                <button className='cv-btn'>Download CV</button>
            </div> 
        </div>
    );
}

export default Dashboard;