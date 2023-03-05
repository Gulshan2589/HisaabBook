// Import the Mongoose library
const mongoose = require('mongoose');

// Connect to the MongoDB database using the connection string and options
mongoose.connect('mongodb+srv://gulsanvarma:Gulshan%403265@cluster0.o3aqqr8.mongodb.net/MyHisabbook', 
{useNewUrlParser : true , useUnifiedTopology : true});

// Get the connection object from Mongoose
const connection = mongoose.connection

// Event listener for connection errors
connection.on('error', err => console.log(err))

// Event listener for successful connection
connection.on('connected' , () => console.log('Mongo DB Connection Successfull'));

