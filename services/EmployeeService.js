const EmployeeModel = require("../models/Employees");

exports.getAllEmployees = async () => {
  return await EmployeeModel.find();
};

exports.createEmployee = async (employeeObj) => {
  return await EmployeeModel.create(employeeObj);
};
exports.getEmployeeById = async (id) => {
  return await EmployeeModel.findById(id);
};

exports.updateEmployee = async (id, employeeObj) => {
  return await EmployeeModel.findByIdAndUpdate(id, employeeObj);
};

exports.deleteEmployee = async (id) => {
  return await EmployeeModel.findByIdAndDelete(id);
};
