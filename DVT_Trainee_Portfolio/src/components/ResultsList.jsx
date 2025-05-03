import { UserCard } from "./UserCard";
import ProjectCard from './ProjectCard';

export default function ResultsList({ results, isEmployeeSearch }) {
  
  if (results.length === 0) {
    return <h1 className="font-size-20-px">Results not Found</h1>;
  }

  return (
    <>
      {isEmployeeSearch && (
        <section className="grid-3-cols gap-24-px">
          {results.map((user, i) => (
            <UserCard key={user.employee_id || i} user={user} />
          ))}
        </section>
      )}

      {!isEmployeeSearch && (
        <section className="grid-3-cols gap-24-px">
          {results.map((project, i) => (
            <ProjectCard key={project.project_id || i} result={project} />
          ))}
        </section>
      )}
    </>
  );
}
