import mongoose from "mongoose";

let isConnected = false;

const connectToMongoDB = async () => {
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
	} catch (error) {
		console.error(error.message);
	}
};

export { connectToMongoDB };
