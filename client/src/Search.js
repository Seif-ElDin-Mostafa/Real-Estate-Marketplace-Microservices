import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from './axiosConfig';

function Search() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        if (e) e.preventDefault();

        try {
            setLoading(true);
            setError('');

            const criteria = {};
            if (priceMin) criteria.priceMin = Number(priceMin);
            if (priceMax) criteria.priceMax = Number(priceMax);
            if (address) criteria.address = address;

            console.log('Search criteria:', criteria);

            const response = await axios.post('/search', criteria);
            console.log('Search response:', response.data);

            if (Array.isArray(response.data)) {
                setProperties(response.data);
            } else {
                setProperties([]);
            }
        } catch (error) {
            console.error('Error searching properties:', error);
            setError('Failed to search properties. Please try again.');
            setProperties([]);
        } finally {
            setLoading(false);
        }
    };

    const clearFilters = () => {
        setAddress('');
        setPriceMin('');
        setPriceMax('');
        setProperties([]);
        setError('');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">RealEstate - Advanced Search</h1>
                <Link to="/">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Back to Home
                    </button>
                </Link>
            </div>

            {/* Search Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Search Filters</h2>
                <form onSubmit={handleSearch} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Address or Location
                        </label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="e.g., Los Angeles, Main St, CA..."
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Minimum Price ($)
                            </label>
                            <input
                                type="number"
                                value={priceMin}
                                onChange={(e) => setPriceMin(e.target.value)}
                                placeholder="e.g., 100000"
                                min="0"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Maximum Price ($)
                            </label>
                            <input
                                type="number"
                                value={priceMax}
                                onChange={(e) => setPriceMax(e.target.value)}
                                placeholder="e.g., 500000"
                                min="0"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-semibold transition"
                            disabled={loading}
                        >
                            {loading ? 'Searching...' : 'Search Properties'}
                        </button>
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-semibold transition"
                        >
                            Clear Filters
                        </button>
                    </div>
                </form>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-12">
                    <div className="text-xl text-gray-600">Searching properties...</div>
                </div>
            )}

            {/* Results Count */}
            {!loading && properties.length > 0 && (
                <div className="mb-4 text-lg font-semibold text-gray-700">
                    Found {properties.length} {properties.length === 1 ? 'property' : 'properties'}
                </div>
            )}

            {/* Empty State */}
            {!loading && properties.length === 0 && !error && (address || priceMin || priceMax) && (
                <div className="text-center py-12">
                    <div className="text-xl text-gray-600 mb-2">No properties found</div>
                    <p className="text-gray-500">Try adjusting your search criteria</p>
                </div>
            )}

            {/* Results Grid */}
            {!loading && properties.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <div key={property._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                            {property.image && (
                                <img
                                    src={property.image}
                                    alt={property.address}
                                    className="w-full h-48 object-cover rounded-lg mb-3"
                                />
                            )}
                            <h3 className="text-lg font-semibold mb-2">{property.address}</h3>
                            <p className="text-gray-600 mb-2">
                                {property.beds} Beds | {property.baths} Baths
                            </p>
                            <p className="text-green-600 font-bold text-xl mb-3">
                                ${property.price.toLocaleString()}
                            </p>
                            <div className="flex space-x-2">
                                <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                    Contact
                                </button>
                                <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Initial State */}
            {!loading && properties.length === 0 && !error && !address && !priceMin && !priceMax && (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <div className="text-xl text-gray-600 mb-2">Enter search criteria to find properties</div>
                    <p className="text-gray-500">Use the filters above to start searching</p>
                </div>
            )}
        </div>
    );
}

export default Search;
