const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  Employee_id: { type: String, required: true, unique: true },
  Emp_name: { type: String, required: true },
  Designation: { type: String, required: true },
  Role: { type: String, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema, 'employees'); // Ensure collection name matches 'from' in $lookup
