import Link from "next/link";

const RedirectTo = ({ question, redirectToLink, redirectTo }) => {
	return (
		<p className="text-md">
			{question}{" "}
			<Link
				href={redirectToLink}
				className="text-red-600 hover:underline hover:text-red-700"
			>
				{redirectTo}
			</Link>
		</p>
	);
};

export default RedirectTo;
