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
		console.log("connectToMongoDB.js\n", "MongoDB connected");
	} catch (error) {
		console.error(
			"connectToMongoDB.js\n",
			"MongoDB connection error:",
			error.message
		);
	}
};

// Reconnection handling
mongoose.connection.on("disconnected", () => {
	console.log(
		"connectToMongoDB.js\n",
		"MongoDB disconnected. Reconnecting..."
	);
	isConnected = false;
	setTimeout(() => connectToMongoDB(), 5000); // Attempt reconnection after 5 seconds
});

export { connectToMongoDB };
