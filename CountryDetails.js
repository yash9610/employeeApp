const mongoose = require('mongoose');

const CountryDetails = new mongoose.Schema({
    "Country_code": String,
    "Country_name": String,
    "Continent": String,
    "Population": Number,
    "Language": String,
    "Currency": String,
    "TimeZone": String,
    "Calling_code": String,
    "GDP": Number,
    "Area": Number,
    "Capital": String
})

module.exports = mongoose.model(
    'country', CountryDetails, 'Countries');
