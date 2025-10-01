import axios from "axios";
import { capitalizeFirstLetter } from "./util";




export async function getAllEmployees(page, query, params, isAvailable) {

    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found");
    }


    axios.defaults.headers.common["authorization"] = `Bearer ${JSON.parse(
        token
    )}`;
    axios.defaults.headers.post["Content-Type"] = "application/json";

    const apiDataEmployee = await axios.get(
        `http://localhost:3000/search/employee`,
        {
            params: {
                page: page,
                query: query,
                techStack: JSON.stringify(params.techStack),
                role: JSON.stringify(params.role),
                location: JSON.stringify(params.location),
                industry: JSON.stringify(params.industry),
                experience: JSON.stringify(params.experience),
                isAvailable: isAvailable,
            },
        }
    );

    const employeesWithTechStackNames = apiDataEmployee.data.employees.map(
        (emp) => ({
            employee_id: emp.id,
            name: emp.name + " " + emp.surname,
            surname: emp.surname,
            title: emp.title,
            phone: emp.phone,
            company: emp.company,
            email: emp.email,
            github: emp.github,
            user: emp.user,
            linkedIn: emp.linkedIn,
            portfolio: emp.portfolio,
            testimonials: emp.testimonials || [],
            role: capitalizeFirstLetter(emp.role),
            softSkilled: emp.softSkills,
            years_active: emp.experience ? emp.experience : "0-1 Years",
            experienced: emp.experience,
            department: capitalizeFirstLetter(emp.department),
            bio: emp.bio,
            availability: emp.availability.available,
            location: emp.location.split(",")[0],
            emp_education: emp.education,
            certificates: emp.certificates,
            career: emp.career,
            projects: emp.projects,
            avatar:
                emp.photoUrl ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            techStack: emp.techStack,
            skills: emp.techStack.map((link) => link.techStack.name),
        })
    );
    return { employeesWithTechStackNames, TotalPages: apiDataEmployee.data.pageCount };
}

export async function getAllProjects(page, query, params, isAvailable) {

    const token = localStorage.getItem("token");

    if (!token) {
        console.error("No token found");
    }


    axios.defaults.headers.common["authorization"] = `Bearer ${JSON.parse(
        token
    )}`;
    axios.defaults.headers.post["Content-Type"] = "application/json";
    const apiDataProject = await axios.get(
        `http://localhost:3000/search/project`,
        {
            params: {
                page: page,
                query: query,
                techStack: JSON.stringify(params.techStack),
                experience: JSON.stringify(params.experience),
                role: JSON.stringify(params.role),
                location: JSON.stringify(params.location),
                industry: JSON.stringify(params.industry),
                isAvailable: isAvailable,
            },
        }
    );

    const projectsWithTechStack = apiDataProject.data.projects.map(
        (project) => ({
            project_id: project.id,
            name: project.name,
            description: project.description,
            created_on: project.createdAt,

            technologies: project.techStack.map((link) => link.techStack.name),
            industries: project.industries.map((link) => link.industry.name),
            username: project.members?.map((link) => link.employee.name)[0],
            avatar: project.members?.map((link) => link.employee.photoUrl)[0],
            screenshot: project.screenshot,
        })
    );
    return { projectsWithTechStack, TotalProjects: apiDataProject.data.pageCount };
}