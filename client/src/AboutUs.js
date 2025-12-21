import React from 'react';
import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <div 
      className="min-h-screen p-4 relative"
      style={{
        backgroundColor: '#ffffff',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 p-4 bg-white fixed w-full top-0 z-10">
        <h1 className="text-2xl font-bold">RealEstate</h1>
        <div className="flex items-center space-x-2 mr-4">
          <Link to="/">
            <button className="bg-blue-500 text-white px-2 py-1 rounded Left">Back to Home</button>
          </Link>
        </div>
      </div>

      {/* About Us Content */}
      <div className="mt-20">
        <div className="max-w-4xl mx-auto p-6 rounded shadow">
          <h2 className="text-3xl font-bold mb-6 text-center">About Us</h2>
          
          {/* Left Image */}
          <div className="flex justify-center mb-4">
            <img src="Villa3.jpg" alt="Team Member" className="rounded-lg" />
          </div>
          

          {/* Content */}
          <p className="text-gray-700 mb-4">
            Welcome to RealEstate, a leading name in the property market with over a decade of experience in delivering exceptional real estate solutions. Our journey began with a simple vision: to connect people with their dream homes and investment opportunities across the globe. Today, we stand as a trusted partner for thousands of clients, offering a wide range of services tailored to meet diverse needs.
          </p>
          <p className="text-gray-700 mb-4">
            Our team comprises highly skilled professionals, including real estate experts, market analysts, and customer service specialists, all dedicated to ensuring your property journey is smooth and successful. We pride ourselves on our deep understanding of local markets, enabling us to provide insights that help our clients make informed decisions. Whether you are a first-time buyer, a seasoned investor, or someone looking to sell, we are here to guide you every step of the way.
          </p>
          <p className="text-gray-700 mb-4">
            At RealEstate, we believe in innovation and technology. Our state-of-the-art platform allows you to explore properties, schedule viewings, and manage transactions with ease. We leverage advanced tools to analyze market trends, ensuring our clients receive the best value for their investments. Our commitment to transparency means you’ll always know where you stand, with clear communication and detailed reports at every stage.
          </p>
          <p className="text-gray-700 mb-4">
            Our services extend beyond buying and selling. We offer property management solutions for landlords, helping you maximize your rental income while minimizing hassles. Our rental division assists tenants in finding the perfect home, with a focus on quality and affordability. Additionally, we provide consultation services for commercial real estate, catering to businesses looking to expand or relocate.
          </p>
          <p className="text-gray-700 mb-4">
            Sustainability is at the heart of our operations. We promote eco-friendly properties and work with developers to create energy-efficient homes that reduce carbon footprints. Our initiatives include partnerships with green building organizations and educational programs to raise awareness about sustainable living. This commitment not only benefits the environment but also adds long-term value to your investments.
          </p>
          <p className="text-gray-700 mb-4">
            Over the years, we have expanded our reach to multiple countries, establishing a strong presence in key markets. Our international team collaborates to bring global expertise to local communities, ensuring that every client receives personalized attention. We celebrate diversity and inclusivity, building a workplace where every voice is heard and valued.
          </p>
          <p className="text-gray-700 mb-4">
            Looking ahead, RealEstate aims to pioneer new standards in the industry. We are investing in research and development to introduce cutting-edge technologies, such as virtual reality tours and AI-driven property matching. Our goal is to redefine the real estate experience, making it more accessible, efficient, and enjoyable for everyone.
          </p>
          {/* Right Image */}
          <div className="flex justify-center mb-4">
            <img src="House.jpg" alt="Office" className="rounded-lg space-x-5 mr-8" />
          </div>
          <p className="text-gray-700 mb-4">
            We invite you to join our growing community of satisfied clients. Whether you’re embarking on your first home purchase or diversifying your investment portfolio, RealEstate is your partner in success. Contact us today to learn more about how we can assist you, or visit our offices for a personalized consultation. Thank you for choosing RealEstate—where your property dreams come to life!
          </p>
          

          
        </div>
      </div>
    </div>
  );
}

export default AboutUs;