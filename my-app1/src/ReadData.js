import React, { useEffect } from 'react';
import axios from 'axios';

function ReadData({ setData }) {
  useEffect(() => {
    // Assuming you have an endpoint that returns student data
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:/api/student/:id');
        setData(response.data); // Set the fetched data to the parent component (App)
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchData();
  }, [setData]); // Runs once when the component mounts

  return (
    <div>
      <h2>Student List</h2>
      
    </div>
  );
}

export default ReadData;
