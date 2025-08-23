import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditModal = ({ student, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    course: '',
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || 'none',
        age: student.age || '',
        course: student.course || '',
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://student-backend-production-c9a0.up.railway.app/students/${student._id}`, {
        ...formData,
        edited: true,
      });
      onSave();     // Refresh the student list
      onClose();    // Close modal
    } catch (err) {
      console.error('Failed to update student:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Edit Student</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="w-full p-2 border rounded"
          />
          <input
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Course"
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function EditStudent() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('https://student-backend-production-c9a0.up.railway.app/students');
      setStudents(res.data);
    } catch (err) {
      console.error('Failed to fetch students:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Students</h2>
      {students.length === 0 ? (
        <p>No students available to edit.</p>
      ) : (
        <ul className="space-y-2">
          {students.map((student) => (
            <li
              key={student._id}
              className="bg-white p-4 shadow rounded flex justify-between items-center"
            >
              <div>
                <p><strong>{student.name}</strong> ({student.email || 'none'})</p>
                <p>Age: {student.age} | Course: {student.course || 'N/A'}</p>
              </div>
              <button
                onClick={() => setSelectedStudent(student)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedStudent && (
        <EditModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onSave={fetchStudents}
        />
      )}
    </div>
  );
}

export default EditStudent;
