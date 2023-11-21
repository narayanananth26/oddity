"use client";
import React, { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Replace this array with your actual items

const Carousel = ({ children }) => {
	const [scrollPosition, setScrollPosition] = useState(0);

	const handleScroll = (direction, scrollAmount) => {
		const container = document.getElementById("carousel-container");
		const maxScroll = (items.length - 5) * scrollAmount;

		if (direction === "left" && scrollPosition > 0) {
			setScrollPosition(scrollPosition - scrollAmount);
		} else if (direction === "right" && scrollPosition < maxScroll) {
			setScrollPosition(scrollPosition + scrollAmount);
		}

		container.scrollTo({
			left: scrollPosition,
			behavior: "smooth",
		});
	};

	return (
		<div className="relative pb-2">
			<div
				id="carousel-container"
				className="flex overflow-x-auto overflow-y-hidden space-x-4 p-4 scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-red-50"
				style={{ scrollBehavior: "smooth" }}
			>
				{children}
			</div>
			<button
				className="absolute top-1/2 left-5 transform -translate-y-1/2 flex-center gap-2 uppercase bg-red-500 rounded-full h-10 hover:bg-red-800 text-red-50 active:bg-red-500 text-xl p-3"
				onClick={() => handleScroll("left", 300)}
			>
				<HiChevronLeft />
			</button>
			<button
				className="absolute top-1/2 right-5 transform -translate-y-1/2 flex-center gap-2 uppercase bg-red-500 rounded-full h-10 hover:bg-red-800 text-red-50 active:bg-red-500 text-xl p-3"
				onClick={() => handleScroll("right", 300)}
			>
				<HiChevronRight />
			</button>
		</div>
	);
};

export default Carousel;
