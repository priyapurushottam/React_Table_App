import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        const formattedData = response.data.map(row => ({
            ...row,
            created_date: new Date(row.created_at).toLocaleDateString(),
            created_time: new Date(row.created_at).toLocaleTimeString()
          }));
        setData(formattedData);
        console.info(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter(row => {
    // Perform case-insensitive search on name and location
    return (row.name && row.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (row.location && row.location.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div>
      <h2>Data Table</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Location</th>
            <th>Age</th>
            <th>Phone Number</th>
            <th>Created Date</th>
            <th>Created Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{row.sno}</td>
              <td>{row.name}</td>
              <td>{row.location}</td>
              <td>{row.age}</td>
              <td>{row.phone}</td>
              <td>{row.created_date}</td>
              <td>{row.created_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;