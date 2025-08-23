import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('https://student-backend-production-5864.up.railway.app/students');
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  const deleteStudent = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
    if (!confirmDelete) return;

    try {
      // Try deleting
      await axios.delete(`https://student-backend-production-5864.up.railway.app/students/${id}`);
      // Remove from local state
      setStudents((prev) => prev.filter((s) => s._id !== id && s.id !== id));
      alert(`${name} was deleted successfully.`);
    } catch (err) {
      console.error('Error deleting student:', err.response?.data || err.message);
      alert('Failed to delete student. Check backend route or ID field.');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Students</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul className="space-y-2">
          {students.map((student) => (
            <li
              key={student._id || student.id}
              className="bg-white p-4 shadow rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {student.name}{' '}
                  {student.edited && (
                    <span className="ml-2 inline-block text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded">
                      Edited
                    </span>
                  )}
                </p>
                <p><strong>Email:</strong> {student.email || 'none'}</p>
                <p><strong>Age:</strong> {student.age}</p>
                <p><strong>Course:</strong> {student.course || 'N/A'}</p>
              </div>
              <button
                onClick={() => deleteStudent(student._id || student.id, student.name)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewStudents;


