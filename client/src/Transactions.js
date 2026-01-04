import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from './axiosConfig';

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [properties, setProperties] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }

        fetchTransactions(token);
    }, [navigate]);

    const fetchTransactions = async (token) => {
        try {
            setLoading(true);

            // Fetch transactions
            const transactionsResponse = await axios.get('/transaction', {
                headers: {
                    Authorization: `Bearer ${token || localStorage.getItem('token')}`
                }
            });

            if (transactionsResponse.data.success) {
                const transactionsData = transactionsResponse.data.data;
                setTransactions(transactionsData);

                // Fetch property details for each transaction
                const propertyIds = [...new Set(transactionsData.map(t => t.propertyId))];
                const propertiesMap = {};

                for (const propertyId of propertyIds) {
                    try {
                        const propertyResponse = await axios.get(`/property/${propertyId}`, {
                            headers: {
                                Authorization: `Bearer ${token || localStorage.getItem('token')}`
                            }
                        });
                        if (propertyResponse.data.success) {
                            propertiesMap[propertyId] = propertyResponse.data.data;
                        }
                    } catch (error) {
                        console.error(`Error fetching property ${propertyId}:`, error);
                        propertiesMap[propertyId] = { address: 'Unknown Property', price: 0 };
                    }
                }

                setProperties(propertiesMap);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = async (transaction) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/transaction/${transaction._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setSelectedTransaction(response.data.data);
                setShowDetails(true);
            }
        } catch (error) {
            console.error('Error fetching transaction details:', error);
            alert('Failed to fetch transaction details');
        }
    };

    const handleDeleteTransaction = async (transactionId) => {
        if (!window.confirm('Are you sure you want to delete this transaction? This action cannot be undone.')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`/transaction/${transactionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                alert('Transaction deleted successfully!');
                // Refresh transactions list
                fetchTransactions(token);
                setShowDetails(false);
            }
        } catch (error) {
            console.error('Error deleting transaction:', error);
            const errorMessage = error.response?.data?.message || 'Failed to delete transaction';
            alert(errorMessage);
        }
    };

    const filterTransactions = () => {
        if (!searchTerm) return transactions;

        return transactions.filter(transaction => {
            const property = properties[transaction.propertyId];
            const searchLower = searchTerm.toLowerCase();

            return (
                transaction._id.toLowerCase().includes(searchLower) ||
                transaction.buyerId?.toLowerCase().includes(searchLower) ||
                transaction.sellerId?.toLowerCase().includes(searchLower) ||
                property?.address?.toLowerCase().includes(searchLower)
            );
        });
    };

    const filteredTransactions = filterTransactions();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
                <div className="text-xl">Loading transactions...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-md p-4 flex items-center justify-between fixed w-full top-0 z-10">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-xl font-bold">RealEstate</Link>
                    <h2 className="text-lg text-gray-600">Transaction History</h2>
                </div>
                <nav className="flex items-center space-x-4">
                    <Link to="/" className="text-gray-600 hover:text-blue-500">Home</Link>
                    <Link to="/buy" className="text-gray-600 hover:text-blue-500">Buy</Link>
                    <Link to="/sale" className="text-gray-600 hover:text-blue-500">Sell</Link>
                    <Link to="/profile" className="text-gray-600 hover:text-blue-500">Profile</Link>
                </nav>
            </header>

            {/* Content */}
            <div className="pt-24 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Search and Filter */}
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 flex-1">
                                <input
                                    type="text"
                                    placeholder="Search by transaction ID, buyer, seller, or property address..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={() => fetchTransactions(localStorage.getItem('token'))}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                >
                                    Refresh
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Transactions Table */}
                    {filteredTransactions.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <p className="text-gray-600 text-lg">
                                {searchTerm ? 'No transactions found matching your search.' : 'No transactions yet.'}
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Transaction ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Property Address
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Price
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredTransactions.map((transaction) => {
                                            const property = properties[transaction.propertyId] || {};
                                            return (
                                                <tr key={transaction._id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                                                        {transaction._id.substring(0, 8)}...
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {property.address || 'Loading...'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                                                        ${property.price?.toLocaleString() || 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {formatDate(transaction.timestamp)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Completed
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button
                                                            onClick={() => handleViewDetails(transaction)}
                                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                                        >
                                                            View Details
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteTransaction(transaction._id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Transaction Details Modal */}
            {showDetails && selectedTransaction && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-800">Transaction Details</h3>
                                <button
                                    onClick={() => setShowDetails(false)}
                                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center text-3xl font-bold transition"
                                    title="Close"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Transaction ID */}
                                <div className="border-b pb-4">
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Transaction ID</label>
                                    <p className="text-gray-900 font-mono text-sm">{selectedTransaction._id}</p>
                                </div>

                                {/* Property Information */}
                                <div className="border-b pb-4">
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Property Address</label>
                                    <p className="text-gray-900">
                                        {properties[selectedTransaction.propertyId]?.address || 'N/A'}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 border-b pb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Property Price</label>
                                        <p className="text-green-600 font-bold text-xl">
                                            ${properties[selectedTransaction.propertyId]?.price?.toLocaleString() || 'N/A'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Property Details</label>
                                        <p className="text-gray-900">
                                            {properties[selectedTransaction.propertyId]?.beds || 'N/A'} Beds | {' '}
                                            {properties[selectedTransaction.propertyId]?.baths || 'N/A'} Baths
                                        </p>
                                    </div>
                                </div>

                                {/* Transaction Information */}
                                <div className="grid grid-cols-2 gap-4 border-b pb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Buyer ID</label>
                                        <p className="text-gray-900 font-mono text-sm">{selectedTransaction.buyerId}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Seller ID</label>
                                        <p className="text-gray-900 font-mono text-sm">{selectedTransaction.sellerId}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 border-b pb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Transaction Date</label>
                                        <p className="text-gray-900">{formatDate(selectedTransaction.timestamp)}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                                        <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Completed
                                        </span>
                                    </div>
                                </div>

                                {/* Property Image */}
                                {properties[selectedTransaction.propertyId]?.image && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-2">Property Image</label>
                                        <img
                                            src={properties[selectedTransaction.propertyId].image}
                                            alt={properties[selectedTransaction.propertyId].address}
                                            className="w-full h-64 object-cover rounded-lg"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                                <button
                                    onClick={() => setShowDetails(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => {
                                        handleDeleteTransaction(selectedTransaction._id);
                                    }}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                >
                                    Delete Transaction
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Transactions;
