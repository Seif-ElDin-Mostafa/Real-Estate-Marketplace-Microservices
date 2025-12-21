import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function loginUser() {
    try {
      const response = await axios.post('/auth/login', {
        username,
        password
      });
      
      if (response.status === 200) {
        console.log('Login response:', response.data);

        // Store the JWT token
        localStorage.setItem('token', response.data.token);
        // Store the user role
        localStorage.setItem('role', response.data.role);
        console.log('Stored role:', response.data.role);
        if (onLoginSuccess) {
          onLoginSuccess(); // Call the callback to update parent state
        }
        navigate('/'); // Navigate to home page
      }
    } catch (error) {
      alert('Login failed. Please check your username and password.');
      console.error('Error logging in:', error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    loginUser();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Login to Your Account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;