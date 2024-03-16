const express = require("express");
require("dotenv").config();
const {
    handleSayHello,
    handleGenerateMarkets,
    handleGetStates,
    handleGetDistricts,
    handleGetMarkets,
    handleGetTomatoes,
    handleGenerateTomato,
} = require("./controllers/db");

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/api", handleSayHello);
app.post("/api/create", handleGenerateMarkets);

app.get("/api/states", handleGetStates);
app.get("/api/districts/:state", handleGetDistricts);
app.get("/api/markets/:state/:district", handleGetMarkets);

app.get("/api/tomato", handleGetTomatoes);
app.post("/api/tomato/create", handleGenerateTomato);

app.listen(PORT, () => {
    console.log(`API Server started on port ${PORT}`);
});
