const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const BillingService = require('../services/BillingService');
const Billing = require('../models/Billing');

//json parse the body
// Use body-parser middleware to parse JSON body
router.use(bodyParser.json());


//get all billing results
router.get('/', (req,res)=>{
    console.log('BillingRouter get called '+req);
    const billingService = new BillingService();
    // Define a callback function to handle the result
    const handleBillingResult = (billingObjects) => {
        // Write your code here to handle the result
        console.log('Received billing result', billingObjects);
        // Send the result back to the client or perform any other action
        res.send(billingObjects);
    };

    // Call the getBilling method with the callback function
    billingService.getBilling(handleBillingResult);
});



//insert a billing
router.post('/', (req,res)=>{
    console.log('BillingRouter post called '+req.body);
    const billingObject = Billing.mapFromRow(req.body);
    // Access the JSON body data
    /*const billingData = JSON.stringify(req.body);
    console.log("BillingRouter post jsonBody "+billingData);*/
    
    const billingService = new BillingService();

    // Call the getBilling method with the callback function
    billingService.setBilling(billingObject);


    res.send("Successfull");
});

//update a billing
router.put('/', (req,res)=>{
    const billingObject = Billing.mapFromRow(req.body);
    console.log('BillingRouter - billingObject - '+billingObject.billing_amount);
    // Access the JSON body data
    /*const billingData = JSON.stringify(req.body);
    console.log("BillingRouter post jsonBody "+billingData);*/
    
    const billingService = new BillingService();

    // Call the getBilling method with the callback function
    billingService.updateBilling(billingObject);

    res.send("Successfull");
});

//get Billing By Id
router.post('/id', (req,res)=>{
    
    const billingService = new BillingService();
    // Define a callback function to handle the result
    const billingObject = Billing.mapFromRow(req.body);
    console.log("BillingRouter - req.body is and Billing id is  "+req.body+" #### "+billingObject.billing_id);

    const handleBillingResult = (billingObjects) => {
        // Write your code here to handle the result
        console.log('Received billing result', billingObjects);
        // Send the result back to the client or perform any other action
        res.send(billingObjects);
    };

    // Call the getBilling method with the callback function
    billingService.getBillingById(billingObject, handleBillingResult);

});



//delete a billing
router.delete('/', (req,res)=>{
    console.log('BillingRouter delete called '+req.body);
    const billingObject = Billing.mapFromRow(req.body);
    // Access the JSON body data
    /*const billingData = JSON.stringify(req.body);
    console.log("BillingRouter post jsonBody "+billingData);*/
    
    const billingService = new BillingService();

    // Call the delete method with the callback function
    billingService.deleteBilling(billingObject);

    res.send("Successfull");
});


module.exports = router;