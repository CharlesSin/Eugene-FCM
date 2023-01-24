const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstname: String,
  lastname: String,
  created: String,
  lastUpdate: String,
});

module.exports = mongoose.model("Employee", employeeSchema);
