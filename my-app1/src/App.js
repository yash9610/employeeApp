import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Form from './Form';
import ReadData from './ReadData';
import FetchApi from './FetchApi';
import UpdateStudent from './UpdateStudent';
import DeleteData from './DeleteData';



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
          <Route path="/DeleteData/:studentId" element={<DeleteData />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;