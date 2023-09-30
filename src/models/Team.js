import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Team name is required."],
		trim: true,
		unique: true,
	},
	logo: {
		type: String,
		trim: true,
	},
	sport: {
		type: String,
		required: [true, "Sport is required."],
		trim: true,
	},
	home_venue: {
		type: String,
		trim: true,
	},
	coach: {
		type: String,
		trim: true,
	},
	players: [
		{
			type: String,
			trim: true,
		},
	],
	win_rate: {
		type: Number,
		min: 0,
		max: 100,
		default: 0,
	},
});

export default mongoose.models.Team || mongoose.model("Team", teamSchema);
