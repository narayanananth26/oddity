"use client";

import Image from "next/image";
import { useState } from "react";

const ImageBanner = ({ src, alt }) => {
	const [isHovered, setIsHovered] = useState(false);
	return (
		<section className="w-screen h-screen relative overflow-hidden">
			<div className="absolute inset-0">
				<Image
					src={src}
					alt={alt}
					layout="fill"
					objectFit="cover"
					objectPosition="center"
					className={`transition-transform transform-gpu ease-in-out duration-700 ${
						isHovered && "scale-125 bg-blend-overlay"
					}`}
				/>
			</div>

			{/* Overlay */}
			<div
				className={`absolute inset-0 bg-black transition-opacity ease-in-out duration-500 ${
					isHovered ? "opacity-50" : "opacity-0"
				}`}
			/>

			{/* Button */}
			<button
				className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 bg-white rounded-lg shadow-lg`}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				Hover to Zoom
			</button>
		</section>
	);
};

export default ImageBanner;
