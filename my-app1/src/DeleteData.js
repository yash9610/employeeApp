import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteData = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    Name: '',
    Phone_No: '',
    Country_code: '',
    Age: ''
  });
  
  const [status, setStatus] = useState({
    loading: true,
    error: null,
    success: false
  });

  // Fetch student data
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/students/${studentId}`);
        if (response.data) {
          setFormData({
            Name: response.data.Name || '',
            Phone_No: response.data.Phone_No || '',
            Country_code: response.data.Country_code || '',
            Age: response.data.Age || ''
          });
        }
        setStatus(prev => ({ ...prev, loading: false }));
      } catch (error) {
        setStatus(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch student data'
        }));
      }
    };

    if (studentId) {
      fetchStudent();
    }
  }, [studentId]);

  // Handle delete submission
  const handleDelete = async () => {
    try {
      setStatus(prev => ({ ...prev, loading: true, error: null }));
      
      // Send delete request to the backend
      const response = await axios.delete(`http://localhost:3001/api/delete/${studentId}`);

      if (response.status === 200) {
        setStatus(prev => ({
          ...prev,
          loading: false,
          success: true
        }));
        
        // Show success message and redirect
        alert('Student deleted successfully!');
        navigate('/ReadData');
      }
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        loading: false,
        error: error.response?.data?.message || 'Failed to delete student'
      }));
    }
  };

  if (status.loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Delete Student Details</h2>
      
      {status.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {status.error}
        </div>
      )}

      {status.success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Student deleted successfully!
        </div>
      ) : (
        <div>
          <p>Are you sure you want to delete the following student?</p>
          <ul className="list-disc ml-6 mb-4">
            <li><strong>Name:</strong> {formData.Name}</li>
            <li><strong>Phone Number:</strong> {formData.Phone_No}</li>
            <li><strong>Country Code:</strong> {formData.Country_code}</li>
            <li><strong>Age:</strong> {formData.Age}</li>
          </ul>

          <div className="flex gap-4">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete Student
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/ReadData')}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteData;
