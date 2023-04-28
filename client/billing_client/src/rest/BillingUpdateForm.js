import React, { Component, useEffect, useState } from "react";
import Billing, { mapFromRow, mapFromRows } from '../models/Billing';


const BillingUpdateForm = (props) => {
  const [billing, setBilling] = useState(new Billing("" ,"","", "", ""));

  useState(()=>{
    alert('BillingUpdateForm - BillingUpdate Form - Props - '+props.id);
    fetch("http://localhost:3000/billing/id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({'billing_id':props.id}),
    }).then(res => res.json()).then((response)=>{
      console.log(response);
      const newBilling = Billing.mapFromRow(response);
      setBilling(newBilling);
    });
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBilling((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = (event) => {
    alert("changing amount is "+billing.billing_amount);

    event.preventDefault();
    console.log("updating vvalue "+billing);
    fetch("http://localhost:3000/billing/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(billing),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create billing.");
          window.location.reload();
        }
        setBilling(new Billing("", "", "", "", ""));
        alert("Billing updated successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to update billing.");
        window.location.reload();
      });
  };
  return (
    <div className="container">
      <h1> Bill Update Form </h1>
    <form onSubmit={handleSubmit}>
      <div className="row">
        Transaction ID:
        <input className="form-control"
          type="text"
          name="id"
          value={billing.id}
          onChange={handleChange}
        />
      </div>
      <div className="row">
        Billing Amount:
        <input  className="form-control"
          type="text"
          name="billing_amount"
          value={billing.billing_amount}
          onChange={handleChange}
        />
      </div>
      <div className="row">
        Remark:
        <input  className="form-control"
          type="text"
          name="remark"
          value={billing.remark}
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <button  className="form-control" type="submit">Update Billing</button>
        </div>
    </form>
    </div>
  );
};

export default BillingUpdateForm;
