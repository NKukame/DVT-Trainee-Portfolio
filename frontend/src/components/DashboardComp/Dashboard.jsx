import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from '../../assets/icons8-profile-picture-100.png';
import Calender from '../../assets/icons8-calendar-100.png';
import Location from '../../assets/icons8-location-100.png';
import Medal from '../../assets/icons8-medal-100.png';
import Github from '../../assets/icons8-github-100.png';
import LinkedIn from '../../assets/icons8-linkedin-100.png';
import Email from '../../assets/icons8-email-100.png';
import award from '../../assets/Award-01.png';
import './Dashboard.css';

function Dashboard(props) {
    return (
        <div className="dashboard">

            <div className="profile">


                <div className="short-bio">
                <div className='profile-picture'>
                    <img src={ProfileImage} className='profile-img' alt="Profile" />
                </div>

                    <p className='profile-name'>{props.testEmployee.name}</p>
                    <p className='profile-role'><strong>{props.testEmployee.role}</strong></p>
                    <p className='profile-bio'>{props.testEmployee.bio}</p>
                </div>

                <div className="profile-info">

                    <Link to='/ProfileCreation'><button className='manage-prfl'>Edit Profile</button></Link>
                    <Link to='/ProfileForm'><button className='manage-prfl'>Generate Profile</button></Link>
<div className='profile-details'>
                    <p><img src={Calender} alt="Experience Icon" className="dashboard-icon" />{props.testEmployee.availability}</p>
                    <p><img src={Location} alt="Location Icon" className="dashboard-icon" />{props.testEmployee.location}</p>
                    <p><img src={award} alt='Role Icon' className="dashboard-icon" />{props.testEmployee.experience}</p>
</div>


                </div>
                <div className="proficiencies">
                    <h2>Proficiencies</h2>
                    <ul className='proficiency-list'>
                        {props.testEmployee.skills.map((skill, index) => (
                            <li key={index} className='skill-tag'>{skill}</li>
                        ))}
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