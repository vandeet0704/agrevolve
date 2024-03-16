/*

const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");

// Connect to MongoDB
mongoose
    .connect(
        "mongodb+srv://shaharsh:pavilion@cluster0.gtvyiuq.mongodb.net/CommodityData?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

const commodityFile = "commodity.csv";
const collectionNames = [];

fs.createReadStream(commodityFile)
    .pipe(csv({ headers: false }))
    .on("data", (row) => {
        collectionNames.push(row[1]);
    })
    .on("end", () => {
        const newArray = collectionNames.slice(1);
        console.log(newArray);
        createCollections(newArray.toLowerCase()); // Call createCollections with newArray
    });

// Function to create collections
async function createCollections(collectionNames) {
    for (const collectionName of collectionNames) {
        try {
            await mongoose.connection.createCollection(collectionName);
            console.log(`Collection ${collectionName} created successfully`);
        } catch (error) {
            console.error(
                `Error creating collection ${collectionName}:`,
                error
            );
        }
    }
    mongoose.disconnect(); // Disconnect after all collections are created
}


*/
const fs = require("fs");
const csv = require("csv-parser");

function csvToJson(csvFile, jsonFile) {
    const results = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(csvFile)
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", () => {
                fs.writeFile(
                    jsonFile,
                    JSON.stringify(results, null, 4),
                    (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(`Converted ${csvFile} to ${jsonFile}`);
                        }
                    }
                );
            })
            .on("error", (err) => reject(err));
    });
}

// Example usage
csvToJson("commodity.csv", "data.json")
    .then((message) => console.log(message))
    .catch((error) => console.error(error));
