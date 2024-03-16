const express = require("express");
require("dotenv").config();
const connectToMongoDB = require("./connect");
const {
    handleSayHello,
    handleGenerateMarkets,
    handleGetStates,
    handleGetDistricts,
    handleGetMarkets,
} = require("./controllers/db");

const app = express();
const PORT = 8080;

connectToMongoDB(String(process.env.MONGODB_URL)).then(() =>
    console.log("Connected to MongoDB")
);
app.use(express.json());

app.get("/api", handleSayHello);
app.post("/api/create", handleGenerateMarkets);

app.get("/api/states", handleGetStates);
app.get("/api/districts/:state", handleGetDistricts);
app.get("/api/markets/:state/:district", handleGetMarkets);

app.listen(PORT, () => {
    console.log(`API Server started on port ${PORT}`);
});
