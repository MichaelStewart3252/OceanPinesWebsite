// routes/property.js
const express = require('express');
const router = express.Router();

// Define your property-related routes here
router.get('/', (req, res) => {
    res.send('Property route');
});

module.exports = router;