import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FetchApi = ({ setData }) => {
  useNavigate();

  useEffect(() => {
    const apiUrl = 'http://localhost:3001/api/get'; // Updated API endpoint

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddData = () => {
    window.open('/form', '_blank');
  };

  return (
    <div>
      {/* Button to open the form */}
      <button type='submit' onClick={handleAddData}>ADD Data</button>
    </div>
  );
};

export default FetchApi;
