import { UserCard } from "../UserCardComp/UserCard";
import ProjectCard from "../ProjectCardComp/ProjectCard";
import { UserSkeletonLoader } from "../SearchResultsComp/SearchResults";
import { SearchContext } from "../../contexts/SearchContext";
import { useContext } from "react";

export default function ResultsList({ results, isEmployeeSearch }) {
  const { isLoading } = useContext(SearchContext);

  if (results.length === 0 && !isLoading) {
    return (
      <h1 className="font-size-20-px no-results">
        No results found. We couldn't find any matching project or person in our
        database.
      </h1>
    );
  }
  if (isLoading) {
    return <UserSkeletonLoader key={results.employee_id} />;
  }

  return (
    <>
      {isEmployeeSearch && (
        <section className="grid-3-cols gap-24-px min-sm:grid-cols-1 results-responsive">
          {results.map((user, i) => {
            const timeStamp = new Date().getTime();
            return <UserCard key={`${user.employee_id}`} user={user} />;
          })}
        </section>
      )}

      {!isEmployeeSearch && (
        <section className="grid-3-cols gap-24-px results-responsive">
          {results.map((project, i) => {
            const timeStamp = new Date().getTime();
            return (
              <ProjectCard key={`${project.project_id}`} result={project} />
            );
          })}
        </section>
      )}
    </>
  );
}
