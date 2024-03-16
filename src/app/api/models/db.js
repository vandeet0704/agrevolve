const mongoose = require("mongoose");

const marketSchema = new mongoose.Schema({
    state_id: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    districts: [
        {
            district_id: {
                type: String,
                required: true,
            },
            district: {
                type: String,
                required: true,
            },
            markets: [
                {
                    market_id: {
                        type: String,
                        required: true,
                    },
                    market: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },
    ],
});

const Markets = mongoose.model("market", marketSchema);

module.exports = { Markets };
