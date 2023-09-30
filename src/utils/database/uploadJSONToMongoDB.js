//* Usage: node uploadData.js <jsonFilePath> <collectionName>

import mongoose from "mongoose";
import fs from "fs";
import { connectToMongoDB } from "./connectToMongoDB";

// Getting the JSON file path and collection name from command-line arguments
const [, , jsonFilePath, collectionName] = process.argv;

if (!jsonFilePath || !collectionName) {
	console.log("Usage: node uploadData.js <jsonFilePath> <collectionName>");
	process.exit(1);
}

const uploadJSONToMongoDB = async () => {
	try {
		const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
		const Model = mongoose.model(collectionName);

		const result = await Model.insertMany(jsonData);

		console.log(`Data inserted successfully: ${result.length} documents`);
	} catch (error) {
		console.error("Error uploading data to MongoDB:", error.message);
	} finally {
		mongoose.connection.close();
	}
};

// Connecting to database and uploading data
connectToMongoDB()
	.then(() => {
		uploadJSONToMongoDB();
	})
	.catch((error) => {
		console.error("MongoDB connection error:", error.message);
	});
