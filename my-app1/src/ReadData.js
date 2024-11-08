import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReadData = () => {
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch student details from the backend using studentId
  const fetchStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/students/${studentId}`);
      if (response.data) {
        setStudent(response.data);  // Set student data to state
        setError(null);              // Reset error state
      } else {
        setStudent(null);            // No data found, reset student state
        setError("No data available."); // Set error if no student found
      }
    } catch (error) {
      setStudent(null);            // Reset student state in case of error
      setError("Error fetching student data."); // Set error message
    }
  };

  // Handle form submission for searching the student by ID
  const handleSearch = (e) => {
    e.preventDefault();
    if (studentId) {
      fetchStudent();  // Call fetchStudent to fetch student details
    } else {
      setError("Please enter a student ID."); // Error if studentId is empty
    }
  };

  return (
    <div>
      <h2>Search Student</h2>
      {/* Search form for inputting student ID */}
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={studentId} 
          onChange={(e) => setStudentId(e.target.value)} 
          placeholder="Enter Student ID"
        />
        <button type="submit">Search</button>
      </form>

      {/* Display error message if there's an issue */}
      {error && <p>{error}</p>}
      
      {/* Display student details if available */}
      {student && (
        <div>
          <h2>Student Details</h2>
          <p><strong>ID:</strong> {student.StudentId}</p>
          <p><strong>Name:</strong> {student.Name}</p>
          <p><strong>Phone Number:</strong> {student.Phone_No}</p>
          <p><strong>Country Code:</strong> {student.Country_code}</p>
          <p><strong>Age:</strong> {student.Age}</p>
          {/* Button to navigate to UpdateStudent page */}
          <button onClick={() => navigate(`/UpdateStudent/${student.StudentId}`)}>Update Data</button>
        </div>
      )}
    </div>
  );
};

export default ReadData;
