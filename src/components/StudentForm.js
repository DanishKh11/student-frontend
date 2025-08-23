import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentForm = ({ fetchStudents, selectedStudent, clearSelection }) => {
  const [student, setStudent] = useState({ name: '', age: '', course: '' });

  useEffect(() => {
    if (selectedStudent) setStudent(selectedStudent);
  }, [selectedStudent]);

  const handleChange = e =>
    setStudent({ ...student, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (student._id) {
      await axios.put(`${process.env.REACT_APP_API_URL}/${student._id}`, student);
    } else {
      await axios.post(process.env.REACT_APP_API_URL, student);
    }
    setStudent({ name: '', age: '', course: '' });
    clearSelection && clearSelection();
    fetchStudents && fetchStudents();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-md space-y-4">
      <h2 className="text-xl font-semibold">{student._id ? 'Update' : 'Add'} Student</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={student.name}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={student.age}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        name="course"
        placeholder="Course"
        value={student.course}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {student._id ? 'Update' : 'Add'}
      </button>
    </form>
  );
};

export default StudentForm;
