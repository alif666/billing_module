import React, { useState } from "react";
import Billing from '../models/Billing';

const BillingForm = (props) => {

  const [billing, setBilling] = useState(
    props.billing
      ? new Billing(
        props.billing.billing_id,
        props.billing.id,
        props.billing.billing_amount,
        props.billing.remark,
        props.billing.status
      )
      : new Billing("", "", "", "", "")
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBilling((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Title to submit and amount is ' + props.title + ' ********' + billing.billing_id + '******** ' + billing.billing_amount);
    if (props.title == 'UPDATE') {

      // Update Form

      fetch("http://localhost:3000/billing/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billing),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to Update billing.");
            window.location.reload();
          }
          setBilling(new Billing("", "", "", "", ""));
          alert("Billing Updated successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to Update billing.");
          window.location.reload();
        });

    } else {

      // Insert Form

      fetch("http://localhost:3000/billing/", {
        method: "POST",
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
          alert("Billing created successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to create billing.");
          window.location.reload();
        });
    }

  };

  return (
    <div className="container">
      <h1>{props.title} Form</h1>
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
          <input className="form-control"
            type="text"
            name="billing_amount"
            value={billing.billing_amount}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          Remark:
          <input className="form-control"
            type="text"
            name="remark"
            value={billing.remark}
            onChange={handleChange}
          />
        </div>
        <div className="row">
          <button className="form-control" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default BillingForm;
