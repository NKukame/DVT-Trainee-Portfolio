import './styles.css';
import './UserPortfolio.css';
import Dashboard from '/src/Dashboard.jsx';
import ProjectCard from './ProjectCard';
import TestimonialCard from '/src/TestimonialCard';
import Header from './components/Header';
import SideBar from './components/SideBar';

function UserPortfolio() {

    return (
        <>

            <div className="app-layout">

                <SideBar />

                <div className='layout-body'>


                    {/* About Section */}



                    <div className="portfolio-layout">
                        <Dashboard />
                        <div className="project-container">
                               <div className="about-section">
                                {/* <h1 className='about-header'>
                                    Hello World!
                                </h1> */}
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                                </p>
                            </div>

                            <div className="testimonial-section">
                                
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <TestimonialCard
                                        key={index}
                                        name={`John Doe ${index + 1}`}
                                        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                    />
                                ))}
                                
                            </div>
                            <main className="main-content">

                                <h2>Featured Projects</h2>
                                <section className="grid-content">

                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <ProjectCard
                                            key={index}
                                            title={`Project ${index + 1}`}
                                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                        />
                                    ))}
                                </section>
                            </main>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}

export default UserPortfolio;
