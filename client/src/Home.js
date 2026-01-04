import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Modal from 'react-modal';
import Login from './Login';
import CreateAccount from './CreateAccount';
import axios from './axiosConfig';


// ربط المودال مع الـ root
Modal.setAppElement('#root');

function Home() {
  const [email, setEmail] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    console.log('Retrieved role from storage:', role);
    setIsLoggedIn(!!token);
    setUserRole(role);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you! A quote has been requested for ${email}.`);
      setEmail('');
    } else {
      alert('Please enter a valid email.');
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      alert(`Thank you! Subscribed with ${newsletterEmail}.`);
      setNewsletterEmail('');
    } else {
      alert('Please enter a valid email.');
    }
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between fixed w-full top-0 z-10">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold">RealEstate</div>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 focus:border-blue-500 outline-none"
              style={{ width: '500px', paddingLeft: '30px' }}
            />
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <button
              type="submit"
              className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </div>
        <nav className="flex items-center space-x-4">
          <Link to="/about" className="text-gray-600 hover:text-blue-500">About Us</Link>
          <Link to="/buy" className="text-gray-600 hover:text-blue-500">Buy</Link>
          <Link to="/sale" className="text-gray-600 hover:text-blue-500">Sell</Link>
          <Link to="/search" className="text-gray-600 hover:text-blue-500">Search</Link>
          <Link to="/analysis" className="text-gray-600 hover:text-blue-500">Market Analysis</Link>
          {isLoggedIn && <Link to="/transactions" className="text-gray-600 hover:text-blue-500">Transactions</Link>}

          {isLoggedIn ? (
            <>
              {userRole === 'admin' ? (
                <Link to="/admin" className="text-gray-600 hover:text-blue-500">Admin Panel</Link>
              ) : userRole === 'user' ? (
                <Link to="/profile" className="text-gray-600 hover:text-blue-500">Profile</Link>
              ) : null}
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsCreateAccountModalOpen(true)}
                className="text-gray-600 hover:text-blue-500"
              >
                Create Account
              </button>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Login
              </button>
            </>
          )}
        </nav>
      </header>

      {/* Login Modal */}
      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={() => setIsLoginModalOpen(false)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
        <Login onLoginSuccess={handleLoginSuccess} />
      </Modal>

      {/* Create Account Modal */}
      <Modal
        isOpen={isCreateAccountModalOpen}
        onRequestClose={() => setIsCreateAccountModalOpen(false)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <button
          onClick={() => setIsCreateAccountModalOpen(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
        <CreateAccount />
      </Modal>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-50 to-orange-50 py-0.1 min-h-screen flex flex-col md:flex-row items-center justify-between px-9">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">Explore your new home for sale or rent</h1>
          <p className="text-gray-600 mb-6">
            Your one-stop solution for all property needs. Search, buy, or sell properties with ease. Everything nearby: supermarket, buses, carmen neighborhood, etc.
          </p>
          <form onSubmit={handleHeroSubmit} className="flex space-x-4 justify-center md:justify-start">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 focus:border-blue-500 outline-none"
              style={{ width: '700px', paddingLeft: '5px' }}
            />
            <button type="submit" className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Submit
            </button>
          </form>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 overflow-hidden">
          <img
            src="home.png"
            alt="Property Illustration"
            className="w-full h-auto object-contain rounded-lg"

          />
        </div>
      </section>

      {/* Three Steps Section */}
      <section className="py-16 px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Everything should be this easy.</h2>
        <p className="text-gray-600 mb-12">Three steps. Three minutes.</p>
        <div className="flex justify-around flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          <div className="flex-1">
            <div className="mb-2">
              <img
                src="broker.png"
                alt="Answer Questions"
                className="w-40 h-40 mx-auto"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose your real estate broker</h3>
            <p className="text-gray-600">
              Choose from the best properties from the largest real estate brokers.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="company.png"
              alt="Answer Questions"
              className="w-40 h-40 mx-auto"
            />
            <h3 className="text-xl font-semibold mb-5">Featured Agencies (Egypt)</h3>
            <p className="text-gray-600">
              Choose the right property with the help of experts
            </p>
          </div>
          <div className="flex-1">
            <img
              src="search.png"
              alt="Answer Questions"
              className="w-40 h-40 mx-auto"
            />
            <h3 className="text-xl font-semibold mb-5">Browse real estate agencies by emirate</h3>
            <p className="text-gray-600">
              View real estate agencies that operate in a specific emirate or region only
            </p>
          </div>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold mb-6">Our recent projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-4">
            <Link to="/Buy">
              <img
                src="Villa3.jpg"
                alt="Project 1"
                className="w-full h-40 object-cover rounded-t-lg"
              />
            </Link>
            <h3 className="text-lg font-semibold mt-2">Sobha Heartland Villas</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur.</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500">★★★★☆ 4.5</span>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <Link to="/Buy">
              <img
                src="Villa2.jpg"
                alt="Project 2"
                className="w-full h-40 object-cover rounded-t-lg"
              />
            </Link>
            <h3 className="text-lg font-semibold mt-2">Villa to Buy</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur.</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500">★★★★☆ 4.5</span>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <Link to="/Buy">
              <img
                src="Townhouse.jpg"
                alt="Project 3"
                className="w-full h-40 object-cover rounded-t-lg"
              />
            </Link>
            <h3 className="text-lg font-semibold mt-2">Townhouse to Buy</h3>
            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur.</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500">★★★★☆ 4.5</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-8 bg-gray-100 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">We are a global, boutique real estate brokerage</h2>
          <p className="text-gray-600 mb-6">
            The transfer of real estate assets is complex, but our process is simple and straightforward.
          </p>
          <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Read More
          </button>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src="House.jpg"
            alt="About Us"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <div className="flex justify-between mt-9 text-2xl text-gray-600 w-6">
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-100 to-white py-16 px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Subscribe Our Newsletter</h2>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet consectetur adipiscing elit.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex space-x-4">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              className="border p-2 rounded-lg w-2/3"
            />
            <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
              Get Quote
            </button>
          </form>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src="Townhouse.jpg"
            alt="Newsletter"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;