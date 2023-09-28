import UnderConstruction from "@components/UI/UnderConstruction";
import Image from "next/image";

const Home = () => {
	return (
		<>
			<div className="w-full h-full overflow-hidden transform-gpu hover:scale-125 relative transition-transform duration-500 ease-in-out">
				<Image
					src="/img.webp"
					alt="banner"
					layout="fill"
					objectFit="cover"
				/>
			</div>

			<UnderConstruction />
		</>
	);
};

export default Home;
