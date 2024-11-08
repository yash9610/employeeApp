import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateStudent = () => {
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

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate form data
  const validateForm = () => {
    const errors = [];
    if (!formData.Name.trim()) errors.push('Name is required');
    if (!formData.Phone_No.trim()) errors.push('Phone number is required');
    if (!formData.Country_code.trim()) errors.push('Country code is required');
    if (!formData.Age || formData.Age < 1) errors.push('Valid age is required');
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setStatus(prev => ({
        ...prev,
        error: validationErrors.join(', ')
      }));
      return;
    }

    // Submit update
    try {
      setStatus(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await axios.put(
        `http://localhost:3001/api/update/${studentId}`,
        formData
      );

      if (response.status === 200) {
        setStatus(prev => ({
          ...prev,
          loading: false,
          success: true
        }));
        
        // Show success message and redirect
        alert('Student updated successfully!');
        navigate('/ReadData');
      }
    } catch (error) {
      setStatus(prev => ({
        ...prev,
        loading: false,
        error: error.response?.data?.message || 'Failed to update student'
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
      <h2 className="text-2xl font-bold mb-6">Update Student Details</h2>
      
      {status.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {status.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Name:</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Phone Number:</label>
          <input
            type="text"
            name="Phone_No"
            value={formData.Phone_No}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Country Code:</label>
          <input
            type="text"
            name="Country_code"
            value={formData.Country_code}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Age:</label>
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
            min="1"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={status.loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {status.loading ? 'Updating...' : 'Update Student'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/ReadData')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStudent;