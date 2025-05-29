
export async function SearchEmployeeController(req, res)  {
    const dataSearch = await fetch("/MockSearch.json");

  const { name } = req.params;
  console.log(name);
  const filteredData = dataSearch.employees.filter((employee) => {
    return employee.name.toLowerCase() === name.toLowerCase();
  });
  const user = await prisma.user.findUnique({
      where: { name },
    });

  if (!filteredData) {
    return res.status(404).send({ message: 'Employee not found' });
  }

  res.send(filteredData);
};

export async function SearchProjectController(req, res) {
  return res.send("Search Project");
}
