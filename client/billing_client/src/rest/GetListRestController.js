import React, { useState, useEffect } from 'react';

function fetchBillingData() {
  return fetch('http://localhost:3000/billing/')
    .then(response => response.json())
    .catch(error => console.error(error.message));
}

function GetList() {
  const [billingData, setBillingData] = useState([]);

  useEffect(() => {
    fetchBillingData().then(data => setBillingData(data));
  }, []);

  const columns = Object.keys(billingData[0] || {});

  return (
    <div>
      <table className='table table-responsive'>
        <thead className='table-thead'>
          <tr>
            {columns.map(column => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {billingData.map((row, index) => (
            <tr key={index}>
              {columns.map(column => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetList;
