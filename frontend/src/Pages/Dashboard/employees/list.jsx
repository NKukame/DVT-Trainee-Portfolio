import { useTable, useNavigation } from "@refinedev/core";
import { Link } from "react-router";

export const EmployeeList = () => {
const { showUrl, editUrl } = useNavigation();
const { tableQuery: { data, isLoading } ,
  current,
  setCurrent,
  pageCount,
  sorters,
  setSorters
} = useTable({ 
  resource: "employee" , 
  pagination: { current: 1, pageSize: 5},
  sorters: { initial: [{ field: "id", order: "asc" }] },
  syncWithLocation: true,
  meta: { 
    include: {
      education: true,
      certificates: true,
      career: true,
      testimonials: true,
      availability: true,
      techStack: {
        include: {
          techStack: true
        }
      },
      softSkills: {
        include: {
          softSkill: true
        }
      },
      projects: {
        include: {
          project: true
        }
      }
    }
  } 
});


if (isLoading) {
  return <div>Loading...</div>;
}

console.log(data);
const onPrevious = () => {
  if (current > 1) {
    setCurrent(current - 1);
  }
};

const onNext = () => {
  if (current < pageCount) {
    setCurrent(current + 1);
  }
};

const onPage = (page) => {
  setCurrent(page);
};

const getSorter = (field) => {
  const sorter = sorters?.find((sorter) => sorter.field === field);

  if (sorter) {
    return sorter.order;
  }
}

const onSort = (field) => {
  const sorter = getSorter(field);
  setSorters(
      sorter === "desc" ? [] : [
      {
          field,
          order: sorter === "asc" ? "desc" : "asc",
      },
      ]
  );
}

const indicator = { asc: "⬆️", desc: "⬇️" };


return (
  <div>
    <h1>Employees</h1>
    <table>
      <thead>
        <tr>
        <th>Avatar</th>
        <th onClick={() => onSort("name")}>Name {indicator[getSorter("name")]}</th>
        <th onClick={() => onSort("surname")}>Surname {indicator[getSorter("surname")]}</th>
        <th onClick={() => onSort("role")}>Role {indicator[getSorter("role")]}</th>
        <th onClick={() => onSort("department")}>Department {indicator[getSorter("department")]}</th>
        <th onClick={() => onSort("location")}>Location {indicator[getSorter("location")]}</th>
        <th onClick={() => onSort("experience")}>Experience {indicator[getSorter("experience")]}</th>
        <th>Projects</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
        {data?.data.map((employee) => (
          <tr key={employee.id}>
            <td><img style={{ width: "50px", height: "50px" }} src={employee.photoUrl} alt="" /></td>
            <td>{employee.name}</td>
            <td>{employee.surname}</td>
            <td>{employee.role}</td>
            <td>{employee.department}</td>
            <td>{employee.location}</td>
            <td>{employee.experience}</td>
            <td>{employee.projects.length}</td>
            <td>
                <Link to={showUrl("employee", employee.id)}>Show</Link>
                <Link to={editUrl("employee", employee.id)}>Edit</Link>
              </td>
          </tr>
        ))}
      </tbody>
    </table>  
    <div className="pagination">
        <button type="button" onClick={onPrevious}>
          {"<"}
        </button>
        <div>
          {current - 1 > 0 && <span onClick={() => onPage(current - 1)}>{current - 1}</span>}
          <span className="current">{current}</span>
          {current + 1 <= pageCount && <span onClick={() => onPage(current + 1)}>{current + 1}</span>}
        </div>
        <button type="button" onClick={onNext}>
          {">"}
        </button>
      </div>
  </div>
);
};