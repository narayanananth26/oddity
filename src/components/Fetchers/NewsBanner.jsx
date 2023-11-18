"use client";
import LoadingImageBanner from "@components/Loading/LoadingImageBanner";
import Overlay from "@components/UI/Overlay";
import { apiUrl } from "@utils/constants/links";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const getAllNews = async () => {
	const res = await fetch(`${apiUrl}/news`, {
		next: { revalidate: 3600 },
	});

	if (!res) throw new Error("Failed to fetch live events");
	return await res.json();
};

const NewsBanner = () => {
	const [isHovered, setIsHovered] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [newsList, setNewsList] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchNewsList = async () => {
			try {
				const data = await getAllNews();
				setNewsList(data.articles);
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchNewsList();
	}, []);
	let news;
	if (newsList.length)
		news = newsList.find((news) => news.urlToImage && news);

	return isLoading ? (
		<LoadingImageBanner />
	) : (
		<section className="w-screen h-screen relative overflow-hidden">
			<div className="absolute inset-0">
				<Image
					src={news.urlToImage}
					alt={news.title}
					fill
					priority
					className={`transition-transform transform-gpu ease-in-out duration-700 object-cover object-center ${
						isHovered && "scale-125 blur-sm"
					}`}
				/>
			</div>

			<Overlay />

			<div
				className={`text-6xl font-bold uppercase absolute top-16 left-2 px-6 py-3 w-1/2 ${
					isHovered ? "text-slate-200" : "text-white"
				}`}
			>
				<Link
					href={news.url}
					target="_blank"
					rel="noopener noreferrer"
					className="relative pb-2"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					{news.title}
				</Link>
			</div>
		</section>
	);
};

export default NewsBanner;
