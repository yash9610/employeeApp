const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    StudentId: String,
    Name: String,
    Phone_No: String,
    Country_code: String,
    Age: Number,    
});

module.exports = mongoose.model(
    'student', StudentSchema, 'Students');