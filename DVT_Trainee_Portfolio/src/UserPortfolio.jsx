import './styles.css';
import './UserPortfolio.css';
import Dashboard from '/src/Dashboard.jsx';
import ProjectCard from './ProjectCard';
import Header from './components/Header';

function UserPortfolio() {
    return (
        <>
            <Header />

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
                                    title="Project Name"
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
                                />
                            ))}
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
}

export default UserPortfolio;