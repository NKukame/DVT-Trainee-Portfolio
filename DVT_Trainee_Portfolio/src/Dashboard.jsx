import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from './assets/icons8-profile-picture-100.png';
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
                    <p>Role</p>
                    <p>Experience</p>
                    <Link to='/ProfileForm'><button className='manage-prfl'>Manage Profile</button></Link>
                </div>
                <div className="proficiencies">
                    <h2>Proficiencies</h2>
                    <p><strong>Languages:</strong> List here</p>
                    <p><strong>Frameworks:</strong> List here</p>
                    <p><strong>OS:</strong> List here</p>
                </div>
                <button className='cv-btn'>Download CV</button>
            </div> 
        </div>
    );
}

export default Dashboard;