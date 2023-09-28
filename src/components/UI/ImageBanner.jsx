"use client";
import Image from "next/image";
import Button from "./Button";
import { useState } from "react";

const ImageBanner = ({ imageLink }) => {
	const [hover, setHover] = useState(false);
	return (
		<div className="w-screen h-screen overflow-hidden relative">
			<div
				className={`group w-full h-full ${
					hover &&
					"transition-transform transform-gpu duration-500 ease-in-out hover:scale-125"
				}`}
			>
				<Image
					src={imageLink}
					alt="Next Image"
					layout="fill"
					objectFit="cover"
					objectPosition="center"
					className="w-full h-full"
				/>
			</div>
			<div
				className="absolute top-1/2 right-1/2 translate-x-1/2 z-50"
				onMouseEnter={() => {
					console.log("in");
					setHover(true);
				}}
				onMouseLeave={() => {
					console.log("out");
					setHover(false);
				}}
			>
				<Button style="primary">Go to page</Button>
			</div>
		</div>
	);
};

export default ImageBanner;
