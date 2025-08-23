import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddStudent from './pages/AddStudent';
import EditStudentForm from './pages/EditStudentForm';
import ViewStudents from './pages/ViewStudents';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 shadow-md px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Student Management</h1>
          <div className="space-x-6">
            <Link to="/" className="text-white hover:text-gray-200 font-medium">Home</Link>
            <Link to="/add" className="text-white hover:text-gray-200 font-medium">Add Student</Link>
            <Link to="/edit" className="text-white hover:text-gray-200 font-medium">Edit Student</Link>
            <Link to="/students" className="text-white hover:text-gray-200 font-medium">View Students</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/edit" element={<EditStudentForm />} />
          <Route path="/students" element={<ViewStudents />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
