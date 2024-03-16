const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");
const {
    connectToMongoDBMarket,
    connectToMongoDBCommodity,
    connectToMongoDBLocal,
} = require("../connect");
const { Decimal128 } = require("mongodb");

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

const commoditySchema = new mongoose.Schema(
    {
        "Reported Date": {
            type: Date,
            required: true,
        },
        Arrivals: {
            type: Decimal128,
            required: true,
        },
        Group: {
            type: String,
        },
        Variety: {
            type: String,
        },
        "Market Name": {
            type: String,
            required: true,
        },
        "Modal Price": {
            type: Decimal128,
        },
        "Min Price": {
            type: Decimal128,
        },
        "Max Price": {
            type: Decimal128,
        },
        "State Name": {
            type: String,
            required: true,
        },
        "District Name": {
            type: String,
            required: true,
        },
    },
    {
        timeseries: {
            timeField: "Reported Date",
            granularity: "days",
        },
        autoCreate: false,
    }
);

const Markets = connectToMongoDBMarket.model("market", marketSchema);

mongoose.pluralize(null);
const Tobacco = connectToMongoDBLocal.model("tobacco", commoditySchema);
const Tomato = connectToMongoDBCommodity.model("tomato", commoditySchema);

module.exports = { Markets, Tomato, Tobacco };

// function createMongoCollections() {
//     const commodityFile = "commodity.csv";
//     const commodities = [];

//     fs.createReadStream(commodityFile)
//         .pipe(csv({ headers: false }))
//         .on("data", (row) => {
//             commodities.push(row[1]);
//         })
//         .on("end", () => {
//             const mongoCollections = {};

//             commodities.forEach((commodity) => {
//                 mongoCollections[commodity] = connectToMongoDBCommodity.model(
//                     commodity.toLowerCase(),
//                     commoditySchema
//                 );
//             });

//             console.log(mongoCollections);
//         });
// }

// createMongoCollections();
//----------------------------

// mongoose
//     .connect("mongodb://localhost:27017/CommodityData")
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.error("Error connecting to MongoDB:", err));

// const commodityFile = "commodity.csv";
// const collectionNames = [];

// fs.createReadStream(commodityFile)
//     .pipe(csv({ headers: false }))
//     .on("data", (row) => {
//         collectionNames.push(row[1]);
//     })
//     .on("end", () => {
//         const newArray = collectionNames
//             .slice(1)
//             .map((name) => name.toLowerCase()); // Convert to lowercase
//         createCollections(newArray); // Call createCollections with newArray
//     });

// // Function to create collections
// async function createCollections(collectionNames) {
//     for (const collectionName of collectionNames) {
//         try {
//             await mongoose.connection.createCollection(collectionName);
//         } catch (error) {
//             console.error(
//                 `Error creating collection ${collectionName}:`,
//                 error
//             );
//         }
//     }
//     mongoose.disconnect();
// }
