const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const propertyRoutes = require('./routes/property');
dotenv.config();

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB and specify the database name
mongoose.connect(process.env.MONGO_URI, {
    dbName: 'PropertyData', // Specify the database name here
}).then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the schema for the Properties collection
const dataSchema = new mongoose.Schema({
    Unit: String,
    Week: Number,
    "Owner Name": String,
    "Owner Contact": String,
});

// Specify the collection name explicitly
const Data = mongoose.model('Data', dataSchema, 'Properties');

// Middleware setup
app.use('/api/property', propertyRoutes);
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/data', async (req, res) => {
    try {
        // Fetch the data from MongoDB
        const data = await Data.find();

        // Send the raw data as JSON response
        res.json(data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data');
    }
});

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('*', (req, res) => {
    res.status(404).send('Page not found');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
