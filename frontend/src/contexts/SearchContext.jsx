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

    useEffect(() => {
        const teamData = async () => {
            setIsLoading(true);
            try{
                const token = localStorage.getItem('token');
                axios.defaults.headers.common['authorization'] = `Bearer ${JSON.parse(token)}`
                axios.defaults.headers.post['Content-Type'] = 'application/json';
                
                const apiDataEmployee = await axios.get('http://localhost:3000/search/employee')
                const apiDataProject = await axios.get('http://localhost:3000/search/project')
                
                console.log(apiDataEmployee.data);
                const employeesWithTechStackNames =
                  apiDataEmployee.data.employees.map((emp) => ({
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
                
                setProjectsWithTechStackNames(projectsWithTechStack)
                setTotalPages(apiDataEmployee.data.total)
                setdata(employeesWithTechStackNames.concat(projectsWithTechStack));
                setSearchResults(employeesWithTechStackNames.concat(projectsWithTechStack));
                setFilteredResults(employeesWithTechStackNames.concat(projectsWithTechStack));
                
            } catch (err){
                console.log(err)
            }finally{
                setIsLoading(false)
            }

        }
        teamData();
     }, []);

    const handleInputChange = (query) => {
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
        
        console.log(filter, category);
        console.log(newSelectedFilter);
        

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
            console.log(updatedResults.length);
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

        if (category === "location") {
            updatedResults = searchResults.filter((employee) => {
                if (newSelectedFilter.length === 0) return true;
                return newSelectedFilter.some(f => employee.location === f);
            });
        }

        if (category === "Experience") {
            updatedResults = handleChange(filter)
        }
        
        setFilteredResults(updatedResults);
    }

    const handleChange = (newValue) => {
        const years =  newValue.split(" ")[0]
        const value = years.split("-")
        console.log(value);
        
        const filteredResults = searchResults.filter((employee) => {
            if(!employee.years_active){
                return false
            }
            
            if(employee.years_active > parseInt(value[0]) &&  employee.years_active < parseInt(value[1])){
                return true
            }
            return false           
        })

        return filteredResults
    };


    return (
        <SearchContext.Provider value={{selectedFilter, handleFilterClick, handleInputChange, filteredResults, setSearchResults, handleChange, allLanguages, allLocations, allRoles, allIndustries, isLoading, total , projectsWithTechStackNames}}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearch(){
    const {selectedFilter, handleFilterClick,handleInputChange,filteredResults, setSearchResults, handleChange, isLoading, total, projectsWithTechStackNames} = useContext(SearchContext)
    return [selectedFilter, handleFilterClick,handleInputChange,filteredResults, setSearchResults, handleChange, isLoading, total, projectsWithTechStackNames]
}
