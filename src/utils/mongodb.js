import mongoose from "mongoose";

let isConnected = false;

const connectToDB = async () => {
	try {
		if (isConnected) {
			console.log("MongoDB connection already established");
			return;
		}

		if (!process.env.MONGODB_URL) {
			throw new Error("Missing MongoDB URL");
		}

		await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		isConnected = true;
		console.log("MongoDB connected");
	} catch (error) {
		console.error("MongoDB connection error:", error.message);
	}
};

// Reconnection handling
mongoose.connection.on("disconnected", () => {
	console.log("MongoDB disconnected. Reconnecting...");
	isConnected = false;
	setTimeout(() => connectToDB(), 5000); // Attempt reconnection after 5 seconds
});

export { connectToDB };
