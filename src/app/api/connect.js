const mongoose = require("mongoose");
require("dotenv").config();

// Atlas MarketData
const connectToMongoDBMarket = mongoose.createConnection(
    String(process.env.MONGODB_URL_MARKET)
);
if (connectToMongoDBMarket) {
    console.log("Connected to MarketData database in MongoDB");
}

// Atlas CommodityData
const connectToMongoDBCommodity = mongoose.createConnection(
    String(process.env.MONGODB_URL_COMMODITY)
);
if (connectToMongoDBCommodity) {
    console.log("Connected to Commodity database in MongoDB");
}

// Local MongoDB
const connectToMongoDBLocal = mongoose.createConnection(
    String(process.env.MONGO_URL_LOCAL)
);
if (connectToMongoDBLocal) {
    console.log("Connected to Local MongoDB");
}

module.exports = {
    connectToMongoDBMarket,
    connectToMongoDBCommodity,
    connectToMongoDBLocal,
};
