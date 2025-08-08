import {useState, useContext, createContext, Children, useEffect} from 'react'
import axios from 'axios'
import { capitalizeFirstLetter } from '../lib/util';
 
export const SearchContext = createContext()
 
 
export const SearchContextProvider = ({children}) => {
 
    const [projectsWithTechStackNames, setProjectsWithTechStackNames] = useState([]);
    const [data, setdata] = useState([]);
    const [isLoading, setIsLoading]  = useState(false);
    const [total ,setTotalPages] = useState(1);
    let [searchResults, setSearchResults] = useState(data)
    let [filteredResults, setFilteredResults] = useState(data)
    let [selectedFilter, setSelectedFilter] = useState([]);
   
    const allLanguages = [...new Set(searchResults.map((employee) => employee.skills).flat())].filter(item => item !== undefined);
    const allIndustries = [...new Set(searchResults.map((employee) => employee.industries).flat())].filter(item => item !== undefined);
    const allRoles = [...new Set(searchResults.map((employee) => employee.role))].filter(item => item !== undefined);
    const allLocations = [...new Set(searchResults.map((employee) => employee.location))].filter(item => item !== undefined)


    const searchData = async(page=1, query) =>{

        console.log(page)
        setIsLoading(true);

        try{
            const token = localStorage.getItem('token');
            axios.defaults.headers.common['authorization'] = `Bearer ${JSON.parse(token)}`
            axios.defaults.headers.post['Content-Type'] = 'application/json';
            
            const apiDataEmployee = await axios.get(`http://localhost:3000/search/employee`, {

                params:{
                    page:page,
                    query:query
                }}
            );

            const apiDataProject = await axios.get(`http://localhost:3000/search/project`, {
                params:{
                    page:page,
                    query:query
                }}
            );

            const employeesWithTechStackNames = apiDataEmployee.data.employees.map((emp) => ({
                    employee_id: emp.id,
                    name: emp.name + " " + emp.surname,
                    surname: emp.surname,
                    email: emp.email,
                    github: emp.github,
                    linkedIn: emp.linkedIn,
                    testimonials: emp.testimonials|| [],
                    role: capitalizeFirstLetter(emp.role),
                    softSkilled: emp.softSkills,
                    years_active: emp.experience ? emp.experience : '0-1 Years',
                    experienced: emp.experience,
                    department: capitalizeFirstLetter(emp.department),
                    bio: emp.bio,
                    availability: emp.availability.available,
                    location: emp.location.split(',')[0],
                    emp_education: emp.education,
                    certificates: emp.certificates,
                    career: emp.career,
                    projects: emp.projects,
                    avatar:
                      emp.photoUrl ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                    techStack: emp.techStack,
                    skills: emp.techStack.map((link) => link.techStack.name),
                  }));

    
            const projectsWithTechStack = apiDataProject.data.projects.map(project => ({
                project_id: project.id,
                name: project.name,
                description: project.description,
                created_on: project.createdAt,

                technologies: project.techStack.map(link => link.techStack.name),
                industries: project.industries.map(link => link.industry.name),
                username: project.members?.map(link => link.employee.name)[0],
                avatar: project.members?.map(link => link.employee.photoUrl)[0],
                screenshot: project.screenshot,
            }))
            
            setProjectsWithTechStackNames(projectsWithTechStack);
            setTotalPages(apiDataEmployee.data.pageCount);
            setdata(employeesWithTechStackNames.concat(projectsWithTechStack));
            setSearchResults(employeesWithTechStackNames.concat(projectsWithTechStack));
            setFilteredResults(employeesWithTechStackNames.concat(projectsWithTechStack));
            
        } catch (err){
            console.log(err)
        }finally{
            setIsLoading(false)
        }
    }


    useEffect(() => {
        searchData();
     }, []);
 
    const handleInputChange = (query) => {
        // searchData(1, query);
        const filteredResults = data.filter((result) => {
            return result.name.toLowerCase().includes(query.toLowerCase())
        });
       
        const results= filteredResults
        setSearchResults(results)
        setFilteredResults(results)
    }
 
    const handleFilterClick = (filter, category) => {
        let newSelectedFilter;
        let updatedResults = searchResults;
        if(selectedFilter.includes(filter)){
            // Remove filter
            newSelectedFilter = selectedFilter.filter((item) => item !== filter);
        }else{
            // Add filter
            newSelectedFilter =  [...selectedFilter, filter];
        }
        setSelectedFilter(newSelectedFilter);

       
        console.log("handleFilterClick - filter:", filter, "category:", category);
        console.log("newSelectedFilter:", newSelectedFilter);
       
 
        if(category.includes("Technologies")){
           
            updatedResults = searchResults.filter((employee) => {
                if(newSelectedFilter.length === 0) return true;
                if(employee.skills){
                    const lowerSkills = employee.skills.map(x => x.toLowerCase())

                    console.log(lowerSkills);        
                   

                    return newSelectedFilter.some((filter) => lowerSkills.includes(filter.toLowerCase()));
                }
 
                if(employee.technologies){
                    const lowerSkills = employee.technologies.map(x => x.toLowerCase())

                    console.log(lowerSkills);        

                    return newSelectedFilter.some((filter) => lowerSkills.includes(filter.toLowerCase()));
                }
            });
        }
        if(category.includes("Roles")){
            updatedResults = searchResults.filter((employee) => {
                if(newSelectedFilter.length === 0) return true;
                if(employee.skills){
                    if (newSelectedFilter.length === 0) return true;
                    return newSelectedFilter.some(f => employee.role.toLowerCase() === f);
                }
            });
 
 
        }
 
        if (category === "Location") {
            console.log("Location filtering - newSelectedFilter:", newSelectedFilter);
            updatedResults = searchResults.filter((employee) => {
                if (newSelectedFilter.length === 0) return true;
                if (!employee.location) return false;
                console.log("Comparing employee location:", employee.location.toLowerCase(), "with filters:", newSelectedFilter);
                return newSelectedFilter.some(f => employee.location.toLowerCase() === f);
            });
            console.log("Location filtered results:", updatedResults.length);
        }
 
        if (category === "Experience") {

            updatedResults = handleChange(filter,newSelectedFilter)
        }
       
        setFilteredResults(updatedResults);
    }


    const handleChange = (filter,newSelectedFilter) => {
        // console.log
        const filteredResults = searchResults.filter((employee) => {
            console.log(employee)
            if(newSelectedFilter.length === 0) return true
            if(employee.years_active){
                return employee.years_active.split(' ')[0] === filter

            }
            return false;
        })

        console.log('done execwdfdflkgjfk')
        return [...filteredResults];

    };
 
 
    return (
        <SearchContext.Provider value={{selectedFilter, handleFilterClick, handleInputChange, filteredResults, setSearchResults, handleChange, allLanguages, allLocations, allRoles, allIndustries, isLoading, total , projectsWithTechStackNames, searchData}}>
            {children}
        </SearchContext.Provider>
    )
}

