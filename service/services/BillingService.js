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

  // Update a Billing
  updateBilling(billingObject) {
    // Create a connection to the MySQL server
    const connection = mysql.createConnection(connectionConfig);

    // Connect to MySQL server
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL server');
    });

    console.log('BillingService setBilling called ' + billingObject);

    // Update query
    const updateQuery = 'UPDATE billing SET status = ?, remark = ? WHERE billing_id = ?';

    // Execute the update query with the values from the billingObject
    connection.query(updateQuery, [billingObject.status, billingObject.remark, billingObject.billing_id], (err, result) => {
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
    const insertQuery = 'INSERT INTO billing (billing_id, id, billing_amount, status, remark, created_at, created_by, updated_at, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // Execute the insert query with the values from the billingObject
    connection.query(insertQuery, [billingObject.billing_id, billingObject.id, billingObject.billing_amount, billingObject.status, billingObject.remark, billingObject.created_at, billingObject.created_by, billingObject.updated_at, billingObject.updated_by], (err, result) => {
      if (err) throw err;
      console.log('Data inserted successfully:', result);

      // Close the MySQL connection
      connection.end((err) => {
        if (err) throw err;
        console.log('Disconnected from MySQL server');
      });
    });

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
