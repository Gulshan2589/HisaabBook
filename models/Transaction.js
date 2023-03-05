// Require the Mongoose library to create and manage MongoDB schemas
const mongoose = require("mongoose");

// Define a new schema for transactions that includes fields 
const transactionSchema = new mongoose.Schema({
    UserId : {type: String, required: true},
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    reference: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
});

// Create a new Mongoose model based on the transaction schema, and export it as a module
const transactionModel = mongoose.model("Trasactions", transactionSchema);

module.exports = transactionModel;