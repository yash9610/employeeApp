import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    StudentId: '',
    Name: '',
    Phone_No: '',
    Country_code: '',
    Age: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = 'http://localhost:3001/api/addStudent';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      if (!response.ok) {
        throw new Error(`Failed to add student: ${response.statusText}`);
      }
    
      const data = await response.json();
      console.log('Student added successfully:', data.message);
      alert('Student added successfully!');

    } catch (error) {
      console.error("Error submitting data:", error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1>Student Form</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
        <label>
          Student ID:
          <input
            type="text"
            name="StudentId"
            value={formData.StudentId}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
        <label>
          Name:
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
        <label>
          Phone Number:
          <input
            type="tel"
            name="Phone_No"
            value={formData.Phone_No}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
        <label>
          Country Code:
          <input
            type="text"
            name="Country_code"
            value={formData.Country_code}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
        <label>
          Age:
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            required
            min="1"
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>Submit</button>
      </form>
    </div>
  );
};

export default Form;
