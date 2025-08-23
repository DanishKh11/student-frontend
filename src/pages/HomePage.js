import React from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome Back!</h2>
      <button
        onClick={goToMainPage}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Main Page
      </button>
    </div>
  );
};

export default Homepage;
