import '../../styles.css';
import './UserPortfolio.css';
import Dashboard from '../../components/DashboardComp/Dashboard';
import ProjectCard from '../../components/ProjectsComp/Projects';
import TestimonialCard from '../../components/TestimonialCardComp/TestimonialCard';
import SideBar from '../../components/SidebarComp/SideBar';

function UserPortfolio() {

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

    const projects = [
        {
            name: "Scientific Calculator",
            techStack: ["HTML", "CSS", "JavaScript"],
            contributors: ["Bob Johnson", "Alice Smith"],
            description: "A scientific calculator with advanced features.",
            liveDemo: "https://example.com/demo",
            sourceCode: "https://github.com/example/scientific-calculator",
        },
        {
            name: "Portfolio Website",
            techStack: ["React", "CSS"],
            contributors: ["John Doe"],
            description: "A personal portfolio website showcasing projects.",
            liveDemo: "https://example.com/portfolio",
            sourceCode: "https://github.com/example/portfolio",
        },
        {
            name: "E-commerce App",
            techStack: ["Node.js", "Express", "MongoDB"],
            contributors: ["Jane Doe"],
            description: "A full-stack e-commerce platform with user authentication.",
            liveDemo: "https://example.com/ecommerce",
            sourceCode: "https://github.com/example/ecommerce",
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
                            <div className="about-section">
                                {/* <h1 className='about-header'>
                                    Hello World!
                                </h1> */}
                                <p>
                                    As a graduate Software Developer with hands-on experience in Java, Python, C# and SQLite for backend development, and HTML, CSS, JS and React, I am passionate about creating innovative solutions that make a difference. I thrive in collaborative environments and am eager to contribute my skills to impactful projects. My goal is to leverage technology to solve real-world problems and continuously learn and grow in the field of software development.
                                </p>
                            </div>

                            <div className="testimonial-section">
                                {testimonials.map((testimonial, index) => (
                                    <TestimonialCard
                                        key={index}
                                        name={testimonial.name}
                                        title={testimonial.title}
                                        message={testimonial.message}
                                        rating={testimonial.rating}
                                    />
                                ))}
                            </div>
                            <main className="main-content">

                                <h2>Featured Projects</h2>
                                <section className="grid-content">
                                    {projects.map((project, index) => (
                                        <div className="grid-item" key={index}>
                                            <ProjectCard project={project} />
                                        </div>
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
