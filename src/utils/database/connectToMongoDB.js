import mongoose from "mongoose";

let isConnected = false;

const connectToMongoDB = async () => {
	try {
		if (isConnected) {
			console.log(
				"connectToMongoDB.js - isConnected?\n",
				"MongoDB connection already established"
			);
			return;
		}

		if (!process.env.MONGODB_URL) {
			throw new Error(
				"connectToMongoDB.js - process.ENV.MONGODB_URL?\n",
				"Missing MongoDB URL"
			);
		}

		await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		isConnected = true;
	} catch (error) {
		console.error(error.message);
	}
};

// Reconnection handling
mongoose.connection.on("disconnected", () => {
	console.log("MongoDB disconnected. Reconnecting...");
	isConnected = false;
	setTimeout(() => connectToMongoDB(), 5000); // Attempt reconnection after 5 seconds
});

export { connectToMongoDB };
