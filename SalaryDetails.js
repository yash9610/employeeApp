const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
  Employee_id: { type: String, required: true, ref: 'Employee' },
  Month: { type: String, required: true },
  salary: { type: Number, required: true }
});

module.exports = mongoose.model('Salary', salarySchema, 'salaries');
