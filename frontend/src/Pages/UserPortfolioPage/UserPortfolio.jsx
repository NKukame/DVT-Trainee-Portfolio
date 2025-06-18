import '../../styles.css';
import './UserPortfolio.css';
import Dashboard from '../../components/DashboardComp/Dashboard';
import ProjectCard from '../../components/ProjectsComp/Projects';
import TestimonialCard from '../../components/TestimonialCardComp/TestimonialCard';
import SideBar from '../../components/SidebarComp/SideBar';
import TabHead from '../../components/UserPortfolioComps/tabs/TabHead';
import { useState } from 'react';
import UserProfileOverview from '../../components/UserPortfolioComps/tabs/UserProfileOverview';
import UserProfileProjects from '../../components/UserPortfolioComps/tabs/UserProfileProjects';
import UserProfileSkillBreakdown from '../../components/UserPortfolioComps/tabs/UserprofileSkillBreakdown';

function UserPortfolio() {
    const [activeTab, setActiveTab] = useState('overview');
    const testimonials = [
        {
            name: "John Doe",
            title: "Software Engineer",
            message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt voluptatem alias ut provident sapiente repellendus.",
            rating: 4,
        },
        {
            name: "Jane Smith",
            title: "Project Manager",
            message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt voluptatem alias ut provident sapiente repellendus.",
            rating: 5,
        },
        {
            name: "Bob Johnson",
            title: "UX Designer",
            message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt voluptatem alias ut provident sapiente repellendus.",
            rating: 3,
        },
    ];

    


    return (
        <>

            <div className="app-layout">

                <SideBar />

                <div className='layout-body'>

                    {/* About Section */}

                    <div className="portfolio-layout">
                        <Dashboard />
                        <div className="project-container">
                            <TabHead activeTab={activeTab} setActiveTab={setActiveTab} />

                            {activeTab === 'overview' && <UserProfileOverview />}
                            {activeTab === 'projects' && <UserProfileProjects />}
                            {activeTab === 'skills' && <UserProfileSkillBreakdown />}

                            {/* <div className="about-section"> */}
                                {/* <h1 className='about-header'>
                                    Hello World!
                                </h1> */}
                                {/* <p>
                                    As a graduate Software Developer with hands-on experience in Java, Python, C# and SQLite for backend development, and HTML, CSS, JS and React, I am passionate about creating innovative solutions that make a difference. I thrive in collaborative environments and am eager to contribute my skills to impactful projects. My goal is to leverage technology to solve real-world problems and continuously learn and grow in the field of software development.
                                </p>
                            </div> */}

                            {/* <div className="testimonial-section">
                                {testimonials.map((testimonial, index) => (
                                    <TestimonialCard
                                        key={index}
                                        name={testimonial.name}
                                        title={testimonial.title}
                                        message={testimonial.message}
                                        rating={testimonial.rating}
                                    />
                                ))}
                            </div> */}
                            
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}

export default UserPortfolio;
