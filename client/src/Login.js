import React, { useState } from 'react';
import axios from './axiosConfig';
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function loginUser() {
    console.log('=== LOGIN ATTEMPT STARTED ===');
    console.log('Username:', username);
    console.log('Password length:', password.length);

    try {
      console.log('Sending request to /auth/login...');
      const response = await axios.post('/auth/login', {
        username,
        password
      });

      console.log('=== LOGIN RESPONSE RECEIVED ===');
      console.log('Status:', response.status);
      console.log('Response data:', response.data);

      if (response.status === 200 || response.status === 201) {
        console.log('Login successful!');
        console.log('Token:', response.data.token);
        console.log('Role:', response.data.role);
        console.log('User ID:', response.data.userId);

        // Store the JWT token
        localStorage.setItem('token', response.data.token);
        // Store the user role
        localStorage.setItem('role', response.data.role);
        // Store the user ID
        localStorage.setItem('userId', response.data.userId);
        console.log('Token, role, and userId stored in localStorage');

        if (onLoginSuccess) {
          console.log('Calling onLoginSuccess callback');
          onLoginSuccess(); // Call the callback to update parent state
        }

        console.log('Navigating to home page...');
        navigate('/'); // Navigate to home page
      }
    } catch (error) {
      console.error('=== LOGIN ERROR ===');
      console.error('Error details:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      alert('Login failed. Please check your username and password.');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('=== FORM SUBMITTED ===');
    console.log('Username field:', username);
    console.log('Password field:', password ? '(provided)' : '(empty)');

    if (!username || !password) {
      console.warn('Missing username or password');
      alert('Please enter both username and password.');
      return;
    }

    console.log('Calling loginUser()...');
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