
import React, { useState, useEffect } from 'react';
import Billing, { mapFromRow } from '../models/Billing';
import BillingForm from './BillingForm';
import BillingUpdateForm from './BillingUpdateForm';
import ReactDOM from 'react-dom/client';
import root from '../index';

function fetchBillingData() {
  return fetch('http://localhost:3000/billing/')
    .then(response => response.json())
    .catch(error => console.error(error.message));
}

function deleteBillinData(id) {
  return fetch('http://localhost:3000/billing/',{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({'billing_id':id}),
    }).then(res => res.json()).then((response)=>{
      console.log(response);
      alert(response);
  });
}

function GetBillingList() {
          const handleOnClickEdit = (row) => {
            alert("Edit Handle on click event "+row.billing_id);
            root.render(

                <BillingForm title = 'UPDATE' billing={row} />

            );
            

          };

      
        const handleOnClickDelete = (row) => {
          alert(`Delete clicked for row ${row.billing_id}`);
          deleteBillinData(row.billing_id);
          window.location.reload();
        };
  const [billingData, setBillingData] = useState([]);

  useEffect(() => {
    fetchBillingData().then(
      data => {
        if(data){
          setBillingData(data);
        }else {
          setBillingData('');
        }
      });
  }, []);

const columns = Object.keys(billingData[0] || {});

return (
<div className = "container">
  <h1>Billing List </h1>
<table className='table table-responsive'>
  <thead className='table-thead'>
    <tr>
        <th>SL</th>
        <th>id</th>
        <th>billing_id</th>
        <th>billing_amount</th>
        <th>remark</th>
        <th>status</th>
        <th colSpan={2}>Action</th>
    </tr>
  </thead>
  <tbody>
    {billingData && billingData.map((row, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{row.id}</td>
        <td>{row.billing_id}</td>
        <td>{row.billing_amount}</td>
        <td>{row.remark}</td>
        <td>{row.status}</td>
        <td>
                <button onClick={() => handleOnClickEdit(row)}>
                  <i className='fa fa-edit'></i>
                </button>
              </td>
              <td>
                <button onClick={() => handleOnClickDelete(row)}>
                  <i className='fa fa-trash'></i>
                </button>
              </td>      
      </tr>
    ))}
  </tbody>
</table>
</div>
);
}

export default GetBillingList;

