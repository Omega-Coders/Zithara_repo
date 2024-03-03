import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './customer.css'; // Import the CSS file

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('date'); // Default sort by 'date'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/table/customers');
        setCustomers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting function based on column and order
  const sortedCustomers = filteredCustomers.sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortBy === 'time') {
      return sortOrder === 'asc'
        ? a.created_at.localeCompare(b.created_at)
        : b.created_at.localeCompare(a.created_at);
    }
    return 0;
  });

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedCustomers.slice(indexOfFirstRecord, indexOfLastRecord);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>Customer List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => { setSortBy('date'); toggleSortOrder(); }}>
              Date{' '}
              {sortBy === 'date' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th onClick={() => { setSortBy('time'); toggleSortOrder(); }}>
              Time{' '}
              {sortBy === 'time' && <span>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((customer) => (
            <tr key={customer.sno}>
              <td>{new Date(customer.created_at).toLocaleDateString()}</td>
              <td>{new Date(customer.created_at).toLocaleTimeString()}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(sortedCustomers.length / recordsPerPage) }, (_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Customer;
