"use client";
import LoadingNewsCard from "@components/Loading/LoadingNewsCard";
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

const HomeNews = () => {
	const [newsList, setNewsList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	useEffect(() => {
		const fetchNewsList = async () => {
			try {
				const data = await getAllNews();
				setNewsList(data.articles);
			} catch (error) {
				console.log(error);
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchNewsList();
	}, []);

	const newsToRender = newsList
		.filter((article) => article.urlToImage)
		.slice(0, 6);

	return (
		<div className="grid grid-cols-3 gap-3 px-16">
			{isLoading ? (
				<>
					<LoadingNewsCard />
					<LoadingNewsCard />
					<LoadingNewsCard />
					<LoadingNewsCard />
					<LoadingNewsCard />
					<LoadingNewsCard />
					<LoadingNewsCard />
					<LoadingNewsCard />
					<LoadingNewsCard />
				</>
			) : (
				<>
					<div className="col-span-2 row-span-2 bg-white p-4 rounded-md shadow-md border">
						<Image
							src={
								newsToRender[0].urlToImage ||
								"/assets/image-placeholder.webp"
							}
							alt={newsToRender[0].title}
							width={1000}
							height={1000}
							className="mb-4 rounded-md"
						/>
						<h2 className="text-xl font-bold mb-10">
							{newsToRender[0].title}
						</h2>
						<p className="text-gray-700 mb-10">
							{newsToRender[0].description}
						</p>
						<p className="text-gray-500 mb-2">
							Author: {newsToRender[0].author}
						</p>
						<p className="text-gray-500 mb-2">
							Published at:{" "}
							{new Date(
								newsToRender[0].publishedAt
							).toLocaleString()}
						</p>
						<Link
							href={newsToRender[0].url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-red-500 hover:underline"
						>
							Read more
						</Link>
					</div>
					<div className="col-span-1 row-span-1 bg-white p-4 rounded-md shadow-md border">
						<Image
							src={
								newsToRender[1].urlToImage ||
								"/assets/image-placeholder.webp"
							}
							alt={newsToRender[1].title}
							width={1000}
							height={1000}
							className="mb-4 rounded-md"
						/>
						<h2 className="text-xl font-bold mb-2">
							{newsToRender[1].title}
						</h2>
						<p className="text-gray-500 mb-2">
							Author: {newsToRender[1].author}
						</p>
						<p className="text-gray-500 mb-2">
							Published at:{" "}
							{new Date(
								newsToRender[1].publishedAt
							).toLocaleString()}
						</p>
						<Link
							href={newsToRender[1].url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-red-500 hover:underline"
						>
							Read more
						</Link>
					</div>
					<div className="col-span-1 row-span-1 bg-white p-4 rounded-md shadow-md border">
						<Image
							src={
								newsToRender[2].urlToImage ||
								"/assets/image-placeholder.webp"
							}
							alt={newsToRender[2].title}
							width={1000}
							height={1000}
							className="mb-4 rounded-md"
						/>
						<h2 className="text-xl font-bold mb-2">
							{newsToRender[2].title}
						</h2>
						<p className="text-gray-500 mb-2">
							Author: {newsToRender[2].author}
						</p>
						<p className="text-gray-500 mb-2">
							Published at:{" "}
							{new Date(
								newsToRender[2].publishedAt
							).toLocaleString()}
						</p>
						<Link
							href={newsToRender[2].url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-red-500 hover:underline"
						>
							Read more
						</Link>
					</div>
					<div className="col-span-1 row-span-1 bg-white p-4 rounded-md shadow-md border">
						<Image
							src={
								newsToRender[3].urlToImage ||
								"/assets/image-placeholder.webp"
							}
							alt={newsToRender[3].title}
							width={1000}
							height={1000}
							className="mb-4 rounded-md"
						/>
						<h2 className="text-xl font-bold mb-2">
							{newsToRender[3].title}
						</h2>
						<p className="text-gray-500 mb-2">
							Author: {newsToRender[3].author}
						</p>
						<p className="text-gray-500 mb-2">
							Published at:{" "}
							{new Date(
								newsToRender[3].publishedAt
							).toLocaleString()}
						</p>
						<Link
							href={newsToRender[3].url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-red-500 hover:underline"
						>
							Read more
						</Link>
					</div>
					<div className="col-span-1 row-span-1 bg-white p-4 rounded-md shadow-md border">
						<Image
							src={
								newsToRender[4].urlToImage ||
								"/assets/image-placeholder.webp"
							}
							alt={newsToRender[4].title}
							width={1000}
							height={1000}
							className="mb-4 rounded-md"
						/>
						<h2 className="text-xl font-bold mb-2">
							{newsToRender[4].title}
						</h2>
						<p className="text-gray-500 mb-2">
							Author: {newsToRender[4].author}
						</p>
						<p className="text-gray-500 mb-2">
							Published at:{" "}
							{new Date(
								newsToRender[4].publishedAt
							).toLocaleString()}
						</p>
						<Link
							href={newsToRender[4].url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-red-500 hover:underline"
						>
							Read more
						</Link>
					</div>
					<div className="col-span-1 row-span-1 bg-white p-4 rounded-md shadow-md border">
						<Image
							src={
								newsToRender[5].urlToImage ||
								"/assets/image-placeholder.webp"
							}
							alt={newsToRender[5].title}
							width={1000}
							height={1000}
							className="mb-4 rounded-md"
						/>
						<h2 className="text-xl font-bold mb-2">
							{newsToRender[5].title}
						</h2>

						<p className="text-gray-500 mb-2">
							Author: {newsToRender[5].author}
						</p>
						<p className="text-gray-500 mb-2">
							Published at:{" "}
							{new Date(
								newsToRender[5].publishedAt
							).toLocaleString()}
						</p>
						<Link
							href={newsToRender[5].url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-red-500 hover:underline"
						>
							Read more
						</Link>
					</div>
				</>
			)}
		</div>
	);
};

export default HomeNews;
