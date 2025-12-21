import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    role: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    // Fetch user data from the API
    fetchUserData(token);
  }, [navigate]);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/auth', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.status === 200 && response.data.success) {
        setUser(response.data.data);
        setEditedUser(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (error.response?.status === 401) {
        // Token is invalid or expired
        localStorage.removeItem('token');
        navigate('/');
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/auth',
        editedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.status === 200 && response.data.success) {
        setUser(response.data.data);
        setIsEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangePassword = async () => {
    const currentPassword = prompt('Enter current password:');
    if (!currentPassword) return;

    const newPassword = prompt('Enter new password:');
    if (!newPassword) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/auth/change-password',
        {
          currentPassword,
          newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.status === 200 && response.data.success) {
        alert('Password updated successfully!');
      } else {
        alert(response.data.message || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      if (error.response?.status === 401) {
        alert('Current password is incorrect');
      } else {
        alert(error.response?.data?.message || 'Failed to change password');
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete('http://localhost:5000/auth', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        localStorage.removeItem('token');
        navigate('/');
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between fixed w-full top-0 z-10">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold">RealEstate</Link>
        </div>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-500">Home</Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-500">About Us</Link>
          <Link to="/buy" className="text-gray-600 hover:text-blue-500">Buy</Link>
          <Link to="/sale" className="text-gray-600 hover:text-blue-500">Sell</Link>
        </nav>
      </header>

      {/* Profile Content */}
      <div className="pt-24 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Edit Profile
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Username</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={editedUser.username || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{user.username}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{user.email}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={editedUser.phone || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{user.phone}</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>
                <div className="space-y-4">
                  <button 
                    onClick={handleChangePassword}
                    className="w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 rounded-md transition"
                  >
                    Change Password
                  </button>
                  <button className="w-full px-4 py-2 text-left bg-gray-100 hover:bg-gray-200 rounded-md transition">
                    Notification Settings
                  </button>
                  <button 
                    onClick={handleDeleteAccount}
                    className="w-full px-4 py-2 text-left bg-red-100 hover:bg-red-200 text-red-600 rounded-md transition"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-gray-600">No recent activity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 