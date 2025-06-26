import { UserCard } from "../UserCardComp/UserCard";
import ProjectCard from '../ProjectCardComp/ProjectCard';
import { UserSkeletonLoader } from "../SearchResultsComp/SearchResults";
import { useSearch } from "../../contexts/SearchContext";

export default function ResultsList({ results, isEmployeeSearch }) {
  
  const [,,,,,, isLoading] = useSearch();

  if (results.length === 0 && isLoading === false) {
    return <h1 className="font-size-20-px no-results">
        No results found. We couldn't find any matching project or person in our database. 
      </h1>;
  }
  if(isLoading === true){
    return <UserSkeletonLoader key={results.employee_id}/>
  }
  return (
    <>

      {isEmployeeSearch && (
        
        <section className="grid-3-cols gap-24-px">
          {results.map((user, i) => {
            const timeStamp = new Date().getTime();
            return(<UserCard key={`${user.employee_id}`}  user={user} />
          )})}
        </section>
      )}

      {!isEmployeeSearch && (
        <section className="grid-3-cols gap-24-px">
          {results.map((project, i) => {
            const timeStamp = new Date().getTime();
            return( <ProjectCard key={`${Math.random()+timeStamp}-${project.project_id}`} result={project} />
          )})}
        </section>
      )}
    </>
  );
}
