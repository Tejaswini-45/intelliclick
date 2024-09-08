import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CitiesTable() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=${search}&rows=50&start=${offset}`
        );
        const data = await response.json();
        if (data.records.length > 0) {
          setCities(prevCities => [...prevCities, ...data.records]);
          setOffset(prevOffset => prevOffset + 50);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (hasMore) {
      fetchCities();
    }
  }, [hasMore, search, offset]);

  
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
      setOffset(prevOffset => prevOffset + 50);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCities([]);
    setOffset(0);
    setHasMore(true);
  };

  const handleCityClick = (city) => {
    navigate(`/weather/${city.fields.name}`);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search cities..."
        value={search}
        onChange={handleSearchChange}
      />
      <table>
        <thead>
          <tr>
            <th>City</th>
            <th>Country</th>
            <th>Timezone</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city, index) => (
            <tr key={index} onClick={() => handleCityClick(city)}>
              <td>
                <Link to={`/weather/${city.fields.name}`}>
                  {city.fields.name}
                </Link>
              </td>
              <td>{city.fields.country}</td>
              <td>{city.fields.timezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default CitiesTable;

