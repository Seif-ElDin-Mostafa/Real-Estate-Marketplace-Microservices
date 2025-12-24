import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from './axiosConfig';

function Analysis() {
    const [analysisData, setAnalysisData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchAnalysis = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await axios.get('/analysis');
            console.log('Analysis response:', response.data);
            setAnalysisData(response.data);
        } catch (error) {
            console.error('Error fetching analysis:', error);
            setError('Failed to load market analysis. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalysis();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-2xl font-semibold text-gray-700 mb-2">Loading Market Analysis...</div>
                    <div className="text-gray-500">Please wait while we analyze recent transactions</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">Market Analysis</h1>
                        <Link to="/">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                Back to Home
                            </button>
                        </Link>
                    </div>
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <p className="font-semibold">{error}</p>
                        <button
                            onClick={fetchAnalysis}
                            className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const hasData = analysisData && analysisData.totalTransactionsAnalyzed > 0;

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Market Analysis Dashboard</h1>
                    <div className="flex space-x-3">
                        <button
                            onClick={fetchAnalysis}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        >
                            Refresh Data
                        </button>
                        <Link to="/">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </div>

                {!hasData ? (
                    <div className="bg-white p-12 rounded-lg shadow-md text-center">
                        <div className="text-xl text-gray-600 mb-2">No Transaction Data Available</div>
                        <p className="text-gray-500">There are no transactions to analyze yet. Check back later!</p>
                    </div>
                ) : (
                    <>
                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium mb-1">Total Transactions</p>
                                        <p className="text-3xl font-bold text-blue-600">
                                            {analysisData.totalTransactionsAnalyzed}
                                        </p>
                                    </div>
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Last 10 transactions analyzed</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium mb-1">Average Price</p>
                                        <p className="text-3xl font-bold text-green-600">
                                            ${Math.round(analysisData.averagePrice).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Based on sold properties</p>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium mb-1">Unique Locations</p>
                                        <p className="text-3xl font-bold text-purple-600">
                                            {analysisData.locations.length}
                                        </p>
                                    </div>
                                    <div className="bg-purple-100 p-3 rounded-full">
                                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Different areas with activity</p>
                            </div>
                        </div>

                        {/* Locations List */}
                        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Transaction Locations</h2>
                            {analysisData.locations.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {analysisData.locations.map((location, index) => (
                                        <div key={index} className="flex items-start space-x-2 p-3 bg-gray-50 rounded">
                                            <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <p className="text-gray-700">{location}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No location data available</p>
                            )}
                        </div>

                        {/* Properties Analyzed */}
                        {analysisData.propertiesAnalyzed && analysisData.propertiesAnalyzed.length > 0 && (
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-4 text-gray-800">Analyzed Properties</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {analysisData.propertiesAnalyzed.map((property) => (
                                        <div key={property._id} className="border rounded-lg p-4 hover:shadow-lg transition">
                                            <h3 className="font-semibold text-gray-800 mb-2">{property.address}</h3>
                                            <div className="space-y-1 text-sm">
                                                <p className="text-gray-600">
                                                    <span className="font-medium">Price:</span> ${property.price.toLocaleString()}
                                                </p>
                                                <p className="text-gray-600">
                                                    <span className="font-medium">Bedrooms:</span> {property.beds}
                                                </p>
                                                <p className="text-gray-600">
                                                    <span className="font-medium">Bathrooms:</span> {property.baths}
                                                </p>
                                                {property.isSold && (
                                                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                                        Sold
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Analysis;
