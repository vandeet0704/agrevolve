const { Markets } = require("../models/db");

async function handleSayHello(req, res) {
    return res.json({ message: "Welcome to the API from Router" });
}

async function handleGenerateMarkets(req, res) {
    const body = req.body;
    await Markets.insertMany(body);
    return res.json({ message: "Document Added Successfully" });
}

// No Use of it
async function handleGetStates(req, res) {
    const stateName = req.params.state;
    const result = await Markets.find({});
    return res.json(result.map((states) => states["state"]));
}

async function handleGetDistricts(req, res) {
    const stateName = req.params.state;
    const state = await Markets.findOne({ state: stateName });
    const districts = state["districts"];
    return res.json(districts.map((district) => district["district"]));
}

async function handleGetMarkets(req, res) {
    const stateName = req.params.state;
    const districtName = req.params.district;

    const state = await Markets.findOne({ state: stateName });
    const districts = state["districts"];

    const markets = districts.find(
        (district) => district["district"] === districtName
    )["markets"];

    return res.json(markets.map((market) => market["market"]));
}

module.exports = {
    handleSayHello,
    handleGenerateMarkets,
    handleGetStates,
    handleGetDistricts,
    handleGetMarkets,
};
