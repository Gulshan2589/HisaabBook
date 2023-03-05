const express = require('express')
// Import the Transaction model from a separate module
const Transaction = require('../models/Transaction')
const router = express.Router();
// Import the moment library for date/time manipulation
const moment = require("moment");

// Route to add a new transaction
router.post('/addtransaction', async function (req, res) {
  try {
    // Create a new Transaction object using the data in the request body
    const newtransaction = new Transaction(req.body);
    await newtransaction.save();
    res.send("Transaction Added Successfully");
  } catch (error) {
    // If there's an error, send a 500 error code and the error message to the client
    res.status(500).json(error);
  }

});

// Route to edit an existing transaction
router.post("/edit-transaction", async function (req, res) {
  try {
    // Find the transaction with the given ID and update it with the payload data in the request body
    await Transaction.findOneAndUpdate({ _id: req.body.transactionId }, req.body.payload)
    res.send("Transaction Updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Route to delete an existing transaction
router.post("/delete-transaction", async function (req, res) {
  try {
    // Find the transaction with the given ID and delete it from the database
    await Transaction.findOneAndDelete({ _id: req.body.transactionId })
    res.send("Transaction Updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Route to get all transactions with optional filtering
router.post('/get-all-transactions', async function (req, res) {
  // Destructure the filtering data from the request body
  const { frequency, selectedRange, type } = req.body;
  try {
    // Find all transactions that match the given criteria
    const transactions = await Transaction.find({
      ...(frequency !== "custom"
        ? {
          date: {
            // If the frequency is not "custom", find transactions within the 
            //past N days where N is the value of the frequency
            $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
          },
        }
        : {
          date: {
            // If the frequency is "custom", find transactions within the 
            //date range specified in the request body
            $gte: selectedRange[0],
            $lte: selectedRange[1],
          },
        }),
      // Find transactions that belong to the user with the given ID
      UserId: req.body.UserId,
      // If a transaction type is specified, find only transactions of that type
      ...(type !== 'all' && { type })
    });
    // Send the matching transactions to the client
    res.send(transactions);
  }
  catch (error) {
    console.log(error)
    res.status(500).json(error);
  }

});

// Export the router so it can be used by other modules
module.exports = router;