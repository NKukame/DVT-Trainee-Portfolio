import './styles.css';
import './UserPortfolio.css';
import Dashboard from '/src/Dashboard.jsx';
import ProjectCard from './ProjectCard';
import Header from './components/Header';
import SideBar from './components/SideBar';

function UserPortfolio() {
    // const projects = [0, 0, 0, 0];
    return (
        <>

            <div className="app-layout">

                <SideBar />

                <div className='layout-body'>


                    {/* About Section */}
                    <div className="about-section">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                        </p>
                    </div>

                    {/* New flex container */}
                    <div className="portfolio-layout">
                        <Dashboard />
                        <div className="project-container">
                            <main className="main-content">
                                <section className="grid-content">
                                    {Array.from({ length: 6 }).map((_, index) => (
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
