import './styles.css';
import './UserPortfolio.css';
import Dashboard from '/src/Dashboard.jsx';
import ProjectCard from './ProjectCard';
import Header from './components/Header';

function UserPortfolio() {
    // const projects = [0, 0, 0, 0];
    return (
        <>
            <Header />

            {/* About Section */}
            <div className="about-section">

                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                </p>

            </div>

            <Dashboard />
            
            <div className="project-container">
                 
                {/* Main Content */}


                <main className="main-content">
  
                {/* Grid Content */}
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
        </>
    );
}

export default UserPortfolio;
