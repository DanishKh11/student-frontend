import React, { useState } from 'react';
import axios from 'axios';

const AddStudent = () => {
  const [student, setStudent] = useState({ name: '', email: '', age: '', course: '' });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://student-backend-production-c9a0.up.railway.app/students', student);
      alert('Student added successfully!');
      setStudent({ name: '', email: '', age: '', course: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to add student.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Add Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={student.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
        <input name="email" value={student.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" required />
        <input name="age" value={student.age} onChange={handleChange} placeholder="Age" className="w-full p-2 border rounded" required />
        <input name="course" value={student.course} onChange={handleChange} placeholder="Course" className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add</button>
      </form>
    </div>
  );
};

export default AddStudent;
