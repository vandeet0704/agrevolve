const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");
const {
    handleGetCommodities,
    handleGetStates,
    handleGetDistricts,
    handleGetMarkets,
} = require("./controllers/marketdb");
const {
    handleGetCommodity,
    handleCreateCommodity,
    handleGetCommodityFilter,
} = require("./controllers/commoditydb");

require("dotenv").config();

const app = express();
const PORT = 8080;
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.json({ limit: "5000mb" }));
app.use(cors());

// Data
app.get("/api/commodities", handleGetCommodities);
app.get("/api/states", handleGetStates);
app.get("/api/districts/:state", handleGetDistricts);
app.get("/api/markets/:state/:district", handleGetMarkets);

// Commodities
app.get("/api/commodity/:commodity", handleGetCommodity);
app.post("/api/commodity/create/:commodity", handleCreateCommodity);
app.post("/api/commodity", handleGetCommodityFilter);

app.listen(PORT, () => {
    console.log(`API Server started on port ${PORT}`);
});
