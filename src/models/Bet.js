import mongoose from "mongoose";

const betSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: [true, "User reference is required."],
	},
	event: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Event",
		required: [true, "Event reference is required."],
	},
	selection: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team",
		required: [true, "Selection is required."],
	},
	status: {
		type: String,
		enum: {
			values: ["scheduled", "live", "completed"],
			message: "Invalid event status.",
		},
		default: "scheduled",
	},
	stake_amount: {
		type: Number,
		required: [true, "Stake amount is required."],
	},
	payout: {
		type: Number,
		required: [true, "Payout is required."],
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.Bet || mongoose.model("Bet", betSchema);
