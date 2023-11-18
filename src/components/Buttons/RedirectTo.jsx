import Link from "next/link";

const RedirectTo = ({ text, linkText, redirectTo }) => {
	return (
		<p className="text-slate-600 text-md">
			{text}{" "}
			<Link
				href={redirectTo}
				className="text-red-600 hover:underline hover:text-red-700"
			>
				{linkText}
			</Link>
		</p>
	);
};

export default RedirectTo;
