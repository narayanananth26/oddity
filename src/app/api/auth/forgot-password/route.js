import { connectToDB } from "@utils/mongodb";
import User from "@models/User";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { mailOptions, transporter } from "@utils/nodemailer";

export const POST = async (req) => {
	const { email } = await req.json();
	await connectToDB();

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return new NextResponse("User not found", {
				status: 400,
			});
		}
		// Generate a unique reset token
		const resetToken = crypto.randomBytes(32).toString("hex");
		user.resetPasswordToken = resetToken;
		user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
		await user.save();

		// Send the password reset email
		const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
		console.log(resetLink);

		await transporter.sendMail({
			...mailOptions,
			subject: "Password Reset",
			text: `You are receiving this email because you (or someone else) has requested a password reset for your account. Please click on the following link to reset your password: \n${resetLink}\nIf you did not request this, please ignore this email, and your password will remain unchanged.`,
		});

		return new NextResponse("Password reset email sent", {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new NextResponse(err.message, {
			status: 500,
		});
	}
};
