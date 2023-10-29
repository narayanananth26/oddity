import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Event name is required."],
		trim: true,
	},
	description: {
		type: String,
		required: [true, "Event description is required."],
		trim: true,
	},
	date: {
		type: Date,
		required: [true, "Event date is required."],
	},
	event_time: {
		type: Date,
		required: [true, "Event time is required."],
	},
	sport: {
		type: String,
		required: [true, "Sport type is required."],
		enum: {
			values: ["Football", "Cricket", "Other"],
			message: "Invalid sport type.",
		},
	},
	home_team: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team",
		required: [true, "Home team is required."],
	},
	away_team: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team",
		required: [true, "Away team is required."],
	},
	odds: {
		home_team: {
			type: Number,
			required: [true, "Home team odds are required."],
		},
		away_team: {
			type: Number,
			required: [true, "Away team odds are required."],
		},
		draw: {
			type: Number,
			required: [true, "Draw odds are required."],
		},
	},
	venue: {
		name: {
			type: String,
			required: [true, "Venue name is required."],
			trim: true,
		},
		location: {
			type: String,
			required: [true, "Venue location is required."],
			trim: true,
		},
	},
	status: {
		type: String,
		enum: {
			values: ["scheduled", "live", "completed", "postponed", "canceled"],
			message: "Invalid event status.",
		},
		default: "Scheduled",
	},
	number_of_bets_placed: {
		type: Number,
		default: 0,
	},
	winner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Team",
		default: null,
	},
	image: {
		type: String,
		required: [true, "Event image is required."],
	},
});

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
