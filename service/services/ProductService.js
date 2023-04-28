const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const path = require('path');
const Product = require('../models/Product');


// Require the MySQL connection configuration from db_connect.js
const connectionConfig = require('../repositories/db');


class ProductService {

  constructor() {

  }
  //Get All Product Information
  getProduct(callback) {
    // Create a connection to the MySQL server
    const connection = mysql.createConnection(connectionConfig);

    // Connect to MySQL server
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL server');
    });
    console.log('ProductService getProduct called ');


    // query to server
    connection.query('select * from product', (err, result) => {
      if (err) throw err;

      // If there is no result
      if (result.length === 0) {
        // Write your code here for handling no result
        console.log('No product records found');
      } else {
        // If there is a result
        // Write your code here for handling the result
        console.log('Query successful', result);

        const productObjects = Product.mapFromRows(result);

        // Call the callback function with the mapped Product objects
        callback(productObjects);
      }

      // Close the MySQL connection
      connection.end((err) => {
        if (err) throw err;
        console.log('Disconnected from MySQL server');
      });
    });
  }



  // Update a Product
  updateProduct(productObject) {
    // Create a connection to the MySQL server
    const connection = mysql.createConnection(connectionConfig);

    // Connect to MySQL server
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL server');
    });

    console.log('ProductService setProduct called with unique id ' + productObject.product_id);

    // Update query
const updateQuery = 'UPDATE product SET id = ?, product_name = ?, status = ?, remark = ?, updated_at = NOW(), updated_by = ? WHERE product_id = ?';

    // Execute the update query with the values from the productObject
    connection.query(updateQuery, [productObject.id, productObject.product_amount, 'active', productObject.remark, productObject.updated_by, productObject.product_id], (err, result) => {
      if (err) throw err;
      console.log('Data updated successfully:', result);

      // Close the MySQL connection
      connection.end((err) => {
        if (err) throw err;
        console.log('Disconnected from MySQL server');
      });
    });
  }

  //Set a Product 
  setProduct(productObject) {
    // Create a connection to the MySQL server
    const connection = mysql.createConnection(connectionConfig);

    // Connect to MySQL server
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL server');
    });
    console.log('ProductService setProduct called ' + productObject);
    // Insert query
    const insertQuery = 'INSERT INTO product (id, product_name, status, remark, created_at, created_by) VALUES (?, ?, "active", ?, NOW(), ?);';

    // Execute the insert query with the values from the productObject
    connection.query(insertQuery, [productObject.id, productObject.product_amount, productObject.remark, productObject.created_by], (err, result) => {
      if (err) throw err;
      console.log('Data inserted successfully:', result);
    });


    // Close the MySQL connection
    connection.end((err) => {
      if (err) throw err;
      console.log('Disconnected from MySQL server');
    });

}

//Get Product Information By Id
getProductById(productObject, callback) {

  //Calling product_id in product object
  console.log('Product Object id is ' + productObject.product_id);

  // Create a connection to the MySQL server
  const connection = mysql.createConnection(connectionConfig);

  // Connect to MySQL server
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server');
  });

  // Get Product by ID query
  const GetProductQuery = 'Select * from product WHERE product_id = ?';

  // Execute the delete query with the product_id from the productObject as the parameter
  connection.query(GetProductQuery, [productObject.product_id], (err, result) => {
    if (err) throw err;
    console.log('Data found by ID successfully:', result);

    productObject = Product.mapFromRow(result[0]);

    console.log("Product Service - Get By Id - " + productObject);

    // Call the callback function with the mapped Product objects
    callback(productObject);

    // Close the MySQL connection
    connection.end((err) => {
      if (err) throw err;
      console.log('Disconnected from MySQL server');
    });
  });
}




// Delete a Product by product_id
deleteProduct(productObject) {
  // Create a connection to the MySQL server
  const connection = mysql.createConnection(connectionConfig);

  // Connect to MySQL server
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server');
  });

  console.log('ProductService deleteProduct called with productObject: ', productObject);

  // Delete query
  const deleteQuery = 'DELETE FROM product WHERE product_id = ?';

  // Execute the delete query with the product_id from the productObject as the parameter
  connection.query(deleteQuery, [productObject.product_id], (err, result) => {
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


module.exports = ProductService;
