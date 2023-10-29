"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiChevronRight, HiMapPin, HiMiniUserGroup } from "react-icons/hi2";
import LoadingImageBanner from "./LoadingImageBanner";
import ZoomOnHoverButton from "@components/Buttons/ZoomOnHoverButton";
import Overlay from "./Overlay";

const ImageBanner = ({ src, alt, children }) => {
	const [isHovered, setIsHovered] = useState(false);
	return (
		<section className="w-screen h-screen relative overflow-hidden">
			<div className="absolute inset-0">
				<Image
					src={src}
					alt={alt}
					fill
					priority
					className={`transition-transform transform-gpu ease-in-out duration-700 object-cover object-center ${
						isHovered && "scale-125 blur-sm"
					}`}
				/>
			</div>

			<Overlay />

			{children}

			<ZoomOnHoverButton
				linkTo="/sportsbook"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				Wager Now
			</ZoomOnHoverButton>
		</section>
	);
};

export default ImageBanner;
