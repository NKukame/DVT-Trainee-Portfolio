import { UserCard } from "./User/UserCard";
import ProjectCard from './ProjectCard/ProjectCard';
import { Container } from "@mui/material";

export default function ResultsList({ results, isEmployeeSearch }) {
  
  if (results.length === 0) {
    return <h1 className="text-title-lg">Results not Found</h1>;
  }

  return (
    <>
      {isEmployeeSearch && (
        <Container className="grid-3-cols">
          {results.map((user, i) => (
            <UserCard key={user.employee_id || i} user={user} />
          ))}
        </Container>
      )}

      {!isEmployeeSearch && (
        <Container className="grid-3-cols">
          {results.map((project, i) => (
            <ProjectCard key={project.project_id || i} result={project} />
          ))}
        </Container>
      )}
    </>
  );
}
