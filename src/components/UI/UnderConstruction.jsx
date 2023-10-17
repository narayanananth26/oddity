import Link from "next/link";

const UnderConstruction = () => {
	return (
		<div className="bg-black flex-center flex-col">
			{Array.from({ length: 100 }, (_, index) => (
				<Link
					href="/"
					key={index}
					className="font-oswald uppercase text-5xl text-red-50 hover:text-red-500 "
				>
					Page under construction
				</Link>
			))}
		</div>
	);
};

export default UnderConstruction;
