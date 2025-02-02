import React, { useState, useEffect } from 'react';
import './TableRepresentation.css';
import { useSelector, useDispatch } from 'react-redux';
import setSelectedData from '../actions/setSetlecteddata'

const TableRepresentation = ({ columnname }) => {
  const data = useSelector((state) => state.selectedData);
  const dispatch = useDispatch(); // Define dispatch here
  
  const graphbox = {
    borderRadius: '10px',
    height: '330px',
    width: '50%',
    padding: '1rem',
    backgroundColor: '#0A2342',
    fontFamily: 'Inter, serif',
    boxShadow:"1px 5px 5px  "
  };

  let country_codes = {
    ARM: 'Europe',
    AUS: 'Asia',
    CAN: 'North America',
    CHE: 'Europe',
    CHN: 'Asia',
    COL: 'South America',
    DEU: 'Europe',
    ESP: 'Europe',
    FRA: 'Europe',
    GBR: 'Europe',
    HKG: 'Asia',
    IND: 'Asia',
    IRL: 'Europe',
    JPN: 'Asia',
    MEX: 'North America',
    MYS: 'Asia',
    NLD: 'Europe',
    PHL: 'Asia',
    POL: 'Europe',
    PRT: 'Europe',
    ROU: 'Europe',
    USA:'America'
  };

  const getCountsByCountry = () => {
    const counts = {};
    data.forEach((item) => {
      const country = item.Country;
      counts[country] = counts[country] ? counts[country] + 1 : 1;
    });
    return Object.entries(counts).map(([country, count]) => ({ _id: country, count }));
  };

  const [countryCounts, setCountryCounts] = useState(getCountsByCountry());
  const [sortOrder, setSortOrder] = useState({
    Country: 'asc',
    Continent: 'asc',
    Count: 'asc'
  });

  useEffect(() => {
    setCountryCounts(getCountsByCountry());
  }, [data]);

  const handleSort = (columnName) => {
    const newSortOrder = {
      ...sortOrder,
      [columnName]: sortOrder[columnName] === 'asc' ? 'desc' : 'asc'
    };
    setSortOrder(newSortOrder);

    const sortedData = [...countryCounts].sort((a, b) => {
      if (columnName === 'Country') {
        return newSortOrder[columnName] === 'asc' ? a._id.localeCompare(b._id) : b._id.localeCompare(a._id);
      } else if (columnName === 'Continent') {
        return newSortOrder[columnName] === 'asc' ? country_codes[a._id].localeCompare(country_codes[b._id]) : country_codes[b._id].localeCompare(country_codes[a._id]);
      } else if (columnName === 'Count') {
        return newSortOrder[columnName] === 'asc' ? a.count - b.count : b.count - a.count;
      }
      return 0;
    });

    setCountryCounts(sortedData);
  };

  const getSortIcon = (columnName) => {
    if (sortOrder[columnName] === 'asc') {
      return <span>&#9650;</span>; // Upward triangle
    } else {
      return <span>&#9660;</span>; // Downward triangle
    }
  };

  // CodyByJ: Click handler to filter data by country
  const handleCountryClick = (countryCode) => {
    const filteredData = data.filter(item => item.Country === countryCode);
    dispatch(setSelectedData(filteredData)); // CodeByJ - Dispatch the action to update the selected data
    // console.log('Filtered Data By Country:', filteredData);
    // console.log('Total No:', filteredData.length);
  };


  return (
    <div className="m-2 text-light" style={graphbox}>
      <h1 style={{ fontSize: '1.2rem', textAlign: 'center', color: '#ffffff' }}>
        {columnname}
      </h1>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('Country')}>
                Country {getSortIcon('Country')}
              </th>
              <th onClick={() => handleSort('Continent')}>
                Continent {getSortIcon('Continent')}
              </th>
              <th onClick={() => handleSort('Count')}>
                Count {getSortIcon('Count')}
              </th>
            </tr>
          </thead>
          <tbody>
            {countryCounts.map((country, index) => (
              <tr key={index} onClick={() => handleCountryClick(country._id)} style={{ cursor: 'pointer' }}> {/* CodyByJ: Add click handler */}
                <td>{country._id}</td>
                <td>{country_codes[country._id]}</td>
                <td>{country.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableRepresentation;
