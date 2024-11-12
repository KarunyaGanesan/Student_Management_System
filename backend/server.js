require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');
const cors = require('cors');
const connectDB = require('./config/db');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/students', studentRoutes); // Updated route to include the '/api' prefix

// Log the MongoDB URI for debugging
// console.log('MongoDB URI:', process.env.MONGO_URI);

// Connect to MongoDB without deprecated options
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        console.error('Error stack:', err.stack);
        process.exit(1);  // Exit the process with a failure code
    });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
