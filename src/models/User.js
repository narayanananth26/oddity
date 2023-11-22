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
