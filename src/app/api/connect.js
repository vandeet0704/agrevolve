const mongoose = require("mongoose");
require("dotenv").config();

function connectToMongoDB(url) {
    return mongoose.connect(url);
}

module.exports = connectToMongoDB;
