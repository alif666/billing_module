const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const path = require('path');
const Billing = require('../models/Billing');


// Require the MySQL connection configuration from db_connect.js
const connectionConfig = require('../repositories/db');


class BillingService {

  constructor() {

  }
  //Get All Billing Information
  getBilling(callback) {
    // Create a connection to the MySQL server
    const connection = mysql.createConnection(connectionConfig);

    // Connect to MySQL server
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL server');
    });
    console.log('BillingService getBilling called ');


    // query to server
    connection.query('select * from billing', (err, result) => {
      if (err) throw err;

      // If there is no result
      if (result.length === 0) {
        // Write your code here for handling no result
        console.log('No billing records found');
      } else {
        // If there is a result
        // Write your code here for handling the result
        console.log('Query successful', result);

        const billingObjects = Billing.mapFromRows(result);

        // Call the callback function with the mapped Billing objects
        callback(billingObjects);
      }

      // Close the MySQL connection
      connection.end((err) => {
        if (err) throw err;
        console.log('Disconnected from MySQL server');
      });
    });
  }



  // Update a Billing
  updateBilling(billingObject) {
    // Create a connection to the MySQL server
    const connection = mysql.createConnection(connectionConfig);

    // Connect to MySQL server
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL server');
    });

    console.log('BillingService setBilling called with unique id ' + billingObject.billing_id);

    // Update query
    const updateQuery = 'UPDATE billing SET id = ?, billing_amount = ?, status = ?, remark = ?, updated_at = NOW(), updated_by = ? WHERE billing_id = ?';

    // Execute the update query with the values from the billingObject
    connection.query(updateQuery, [billingObject.id, billingObject.billing_amount, 'active', billingObject.remark, billingObject.updated_by, billingObject.billing_id], (err, result) => {
      if (err) throw err;
      console.log('Data updated successfully:', result);

      // Close the MySQL connection
      connection.end((err) => {
        if (err) throw err;
        console.log('Disconnected from MySQL server');
      });
    });
  }

  //Set a Billing 
  setBilling(billingObject) {
    // Create a connection to the MySQL server
    const connection = mysql.createConnection(connectionConfig);

    // Connect to MySQL server
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL server');
    });
    console.log('BillingService setBilling called ' + billingObject);
    // Insert query
    const insertQuery = 'INSERT INTO billing (id, billing_amount, status, remark, created_at, created_by) VALUES (?, ?, "active", ?, NOW(), ?);';

    // Execute the insert query with the values from the billingObject
    connection.query(insertQuery, [billingObject.id, billingObject.billing_amount, billingObject.remark, billingObject.created_by], (err, result) => {
      if (err) throw err;
      console.log('Data inserted successfully:', result);
    });


    // Close the MySQL connection
    connection.end((err) => {
      if (err) throw err;
      console.log('Disconnected from MySQL server');
    });

}

//Get Billing Information By Id
getBillingById(billingObject, callback) {

  //Calling billing_id in billing object
  console.log('Billing Object id is ' + billingObject.billing_id);

  // Create a connection to the MySQL server
  const connection = mysql.createConnection(connectionConfig);

  // Connect to MySQL server
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server');
  });

  // Get Billing by ID query
  const GetBillingQuery = 'Select * from billing WHERE billing_id = ?';

  // Execute the delete query with the billing_id from the billingObject as the parameter
  connection.query(GetBillingQuery, [billingObject.billing_id], (err, result) => {
    if (err) throw err;
    console.log('Data found by ID successfully:', result);

    billingObject = Billing.mapFromRow(result[0]);

    console.log("Billing Service - Get By Id - " + billingObject);

    // Call the callback function with the mapped Billing objects
    callback(billingObject);

    // Close the MySQL connection
    connection.end((err) => {
      if (err) throw err;
      console.log('Disconnected from MySQL server');
    });
  });
}




// Delete a Billing by billing_id
deleteBilling(billingObject) {
  // Create a connection to the MySQL server
  const connection = mysql.createConnection(connectionConfig);

  // Connect to MySQL server
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server');
  });

  console.log('BillingService deleteBilling called with billingObject: ', billingObject);

  // Delete query
  const deleteQuery = 'DELETE FROM billing WHERE billing_id = ?';

  // Execute the delete query with the billing_id from the billingObject as the parameter
  connection.query(deleteQuery, [billingObject.billing_id], (err, result) => {
    if (err) throw err;
    console.log('Data deleted successfully:', result);

    // Close the MySQL connection
    connection.end((err) => {
      if (err) throw err;
      console.log('Disconnected from MySQL server');
    });
  });
}

}


module.exports = BillingService;
