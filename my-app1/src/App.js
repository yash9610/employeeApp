import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Form from './Form';
import ReadData from './ReadData';
import FetchApi from './FetchApi';
import UpdateStudent from './UpdateStudent';



function App() {

    const [data, setData] = useState([]); // Initialize data as an array
  return (
    <div className="App">
      <Router>
        <Routes>
        {/* <Route path="/" element={<FetchApi setData={setData} />} /> */}
          {/* Home route to read data */}
           <Route path="/ReadData" element={<ReadData  />} />
          {/* Route to display student details */}
          <Route path="/form" element={<Form />} />
          <Route path="/UpdateStudent/:studentId" element={<UpdateStudent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;