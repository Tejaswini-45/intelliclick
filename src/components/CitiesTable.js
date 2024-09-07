// src/components/CitiesTable.js
import React, { useState, useEffect } from 'react';
import { fetchCities } from '../services/citiesService';

const CitiesTable = () => {
  const [cities, setCities] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const loadCities = async () => {
      const newCities = await fetchCities(page);
      setCities((prev) => [...prev, ...newCities]);
    };

    loadCities();
  }, [page]);

  // Infinite Scroll Logic here (e.g., using IntersectionObserver)
  // Example Infinite Scroll Logic:
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      setPage((prev) => prev + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search, filter, and sort logic
  const filteredCities = cities
    .filter(city => city.fields.city.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.fields.city.localeCompare(b.fields.city);
      return b.fields.city.localeCompare(a.fields.city);
    });

  return (
    <div>
      <input
        type="text"
        placeholder="Search cities..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>City Name</th>
            <th>Country</th>
            <th>Timezone</th>
          </tr>
        </thead>
        <tbody>
          {filteredCities.map(city => (
            <tr key={city.recordid}>
              <td>
                <a href={`/weather/${city.fields.city}`}>{city.fields.city}</a>
              </td>
              <td>{city.fields.country}</td>
              <td>{city.fields.timezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CitiesTable;
