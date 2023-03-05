// import Express.js
const express = require('express')

// import database connection module
const dbConnect = require('./dbConnect')

// Create an instance of Express.js
const app = express()

// Middleware to parse incoming requests as JSON
app.use(express.json())

// Import and use the user and transaction routes
const userRoute = require('./routes/usersRoutes');
const transactionRoute = require('./routes/transactionRoute');
app.use('/api/users/', userRoute);
app.use('/api/transaction/', transactionRoute);

const path = require('path');

// Set the port to listen for incoming requests
const port = process.env.PORT ||  4000;

if(process.env.NODE_ENV === 'production')
{
     app.use('/' , express.static('client/build'))

     app.get('*' , (req, res)=>{
         res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
     })
}


// Start the server and listen for incoming requests on the specified port
app.listen(port, () => console.log(`Node JS Server started at port ${port}!`));




