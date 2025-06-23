import { UserCard } from "../UserCardComp/UserCard";
import ProjectCard from '../ProjectCardComp/ProjectCard';

export default function ResultsList({ results, isEmployeeSearch }) {
  
  if (results.length === 0) {
    return <h1 className="font-size-20-px no-results">
      No results found. We couldn't find any matching project or person in our database. Please check your spelling or try a different search term.
    </h1>;
  }

  return (
    <>
      {isEmployeeSearch && (
        <section className="grid-3-cols gap-24-px">
          {results.map((user, i) => {
            const timeStamp = new Date().getTime();
            return(<UserCard key={`${Math.random()+timeStamp}-${user.employee_id}`} user={user} />
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
