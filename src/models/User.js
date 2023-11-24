import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
		},
		image: {
			type: String,
			default: "/assets/user-icon.svg",
			required: true,
		},
		balance: {
			type: Number,
			default: 0,
			required: true,
		},
		role: {
			type: String,
			enum: {
				values: ["user", "admin"],
			},
			default: "user",
			required: true,
		},
		bets: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Bet",
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
