import bcrypt from "bcrypt";
import { connectToDB } from "@utils/database";
import User from "@models/User";
import { NextResponse } from "next/server";

export const POST = async (req) => {
	const { token, newPassword } = await req.json();
	await connectToDB();

	try {
		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpires: { $gt: Date.now() },
		});

		if (!user) {
			return new NextResponse("Invalid or expired token", {
				status: 400,
			});
		}

		// Hash the new password
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Update the user's password and clear the reset token
		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpires = undefined;
		await user.save();

		return new NextResponse("Password reset successfully", {
			status: 200,
		});
	} catch (error) {
		return new NextResponse(error.message, { status: 500 });
	}
};
