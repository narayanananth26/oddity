"use client";

import Image from "next/image";
import { useState } from "react";
import { HiChevronRight } from "react-icons/hi2";

const ImageBanner = ({ data }) => {
	const [isHovered, setIsHovered] = useState(false);
	return (
		<section className="w-screen h-screen relative overflow-hidden">
			<div className="absolute inset-0">
				<Image
					src={data.image || "/img.webp"}
					alt={data.name || "banner"}
					fill
					className={`transition-transform transform-gpu ease-in-out duration-700 object-cover object-center ${
						isHovered && "scale-125 blur-sm"
					}`}
				/>
			</div>

			{/* Overlay */}
			<div
				className={`absolute inset-0 bg-black transition-opacity ease-in-out duration-500 opacity-70 ${
					isHovered && ""
				}`}
			/>

			<div className="flex flex-col flex-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-2">
				<h1 className="text-5xl text-white uppercase font-bold">
					{data.description}
				</h1>
				<p className="text-center text-lg text-white font-bold">
					{data.name}
				</p>
			</div>

			{/* Button */}
			<button
				className={`flex-center text-white text-7xl font-bold uppercase absolute bottom-0 left-0 transform translate-x-1/4 -translate-y-1/2 px-6 py-3 hover:text-red-500`}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				Wager Now <HiChevronRight />
			</button>
		</section>
	);
};

export default ImageBanner;
