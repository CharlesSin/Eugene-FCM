const employeeService = require("../services/EmployeeService");

const getAllEmployees = async (req, res) => {
  const employees = await employeeService.getAllEmployees();
  res.status(201).json({ employees });
};

const createNewEmployee = async (req, res) => {
  const newEmployee = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    created: new Date(),
  };

  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res.status(400).json({ message: "First and last names are required." });
  }

  const createEmployee = await employeeService.createEmployee(newEmployee);
  res.status(201).json({ success: `New user ${newEmployee.firstname} ${newEmployee.lastname} created!`, data: createEmployee });
};

const updateEmployee = async (req, res) => {
  const allEmployee = await employeeService.getAllEmployees();
  const employee = allEmployee.find((emp) => emp._id.valueOf() === req.body.id);

  if (!employee) {
    return res.status(400).json({ message: `Employee ID ${req.body.id} not found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;

  await employeeService.updateEmployee(employee._id, {
    firstname: employee.firstname,
    lastname: employee.lastname,
    lastUpdate: new Date(),
  });

  res.status(201).json({ data: "Update Successful" });
};

const deleteEmployee = async (req, res) => {
  const allEmployee = await employeeService.getAllEmployees();
  const employee = allEmployee.find((emp) => emp._id.valueOf() === req.body.id);

  if (!employee) {
    return res.status(400).json({ message: `Employee ID ${req.body.id} not found` });
  }

  await employeeService.deleteEmployee(req.body.id);
  res.status(200).json({ data: "Delete Successful" });
};

const getEmployee = async (req, res) => {
  const employee = await employeeService.getEmployeeById(req.params.id);

  if (!employee) {
    return res.status(400).json({ message: `Employee ID ${req.params.id} not found` });
  }

  res.status(200).json({ data: employee });
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
