import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navigation() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/auth', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.status === 200 && response.data.success) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md p-4 flex items-center justify-between fixed w-full top-0 z-10">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-xl font-bold">RealEstate</Link>
      </div>
      <nav className="flex items-center space-x-4">
        <Link to="/" className="text-gray-600 hover:text-blue-500">Home</Link>
        <Link to="/about" className="text-gray-600 hover:text-blue-500">About Us</Link>
        <Link to="/buy" className="text-gray-600 hover:text-blue-500">Buy</Link>
        <Link to="/sale" className="text-gray-600 hover:text-blue-500">Sell</Link>
        {user ? (
          <>
            {user.role === 'admin' && (
              <Link to="/admin" className="text-gray-600 hover:text-blue-500">Admin Dashboard</Link>
            )}
            <Link to="/profile" className="text-gray-600 hover:text-blue-500">Profile</Link>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-blue-500"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="text-gray-600 hover:text-blue-500">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Navigation; 