import React, { useState } from 'react';
import './App.css';
import FetchApi from './FetchApi';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './Form';
import ReadData from './ReadData';

function App() {
  const [data, setData] = useState([]); // Initialize data as an array

  console.log(data)
  return (
    <div className="App">

        <Router>
      <Routes>
      <Route path="/" element={<ReadData setData={setData} />} />
      {/* <Route path="/form" element={<Form />} /> */}
      </Routes>
    </Router>

      <header className="header">
        <h1>Student Data Table</h1>
      </header>
      
      <main>
        <table>
          <thead>
            <tr>
              <th>STUDENT_ID</th>
              <th>Name</th>
              <th>PHONE_NO</th>
              <th>COUNTRY_CODE</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {/* Check if data is an array and map over it */}
            {Array.isArray(data) && data.map((row, index) => (
              <tr key={index}>
                <td>{row.StudentId}</td>
                <td>{row.Name}</td>
                <td>{row.Phone_No}</td>
                <td>{row.Country_code}</td>
                <td>{row.Age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <footer className="footer">
        <p>2024 Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
