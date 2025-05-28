const dataSearch = require('../Data/MockSearch.json');

async function SearchEmployeeController(req, res)  {
  const { name } = req.params;
  console.log(name);
  const filteredData = dataSearch.employees.filter((employee) => {
    return employee.name.toLowerCase() === name.toLowerCase();
  });

  if (!filteredData) {
    return res.status(404).send({ message: 'Employee not found' });
  }

  res.send(filteredData);
};

async function SearchProjectController(req, res) {
  return res.send("Search Project");
}

module.exports = {SearchEmployeeController, SearchProjectController};