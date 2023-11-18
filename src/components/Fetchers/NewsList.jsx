"use client";
import NewsCard from "@components/Cards/NewsCard";
import { apiUrl } from "@utils/constants/links";
import { useEffect, useState } from "react";

const getAllNews = async () => {
	const res = await fetch(`${apiUrl}/news`, {
		next: { revalidate: 3600 },
	});

	if (!res) throw new Error("Failed to fetch live events");
	return await res.json();
};

const NewsList = () => {
	const [newsList, setNewsList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	useEffect(() => {
		const fetchNewsList = async () => {
			try {
				const data = await getAllNews();
				setNewsList(data);
			} catch (error) {
				console.log(error);
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchNewsList();
	}, []);

	return (
		<>
			<div className="flex-center relative mt-24 mb-16 text-5xl uppercase text-red-500 bg-white w-full">
				<span className="flex-center border-b-2 border-slate-300 w-3/4 h-0" />
				<span className="flex-center absolute right-1/2 translate-x-1/2 z-10 h-fit bg-inherit px-3">
					Latest News
				</span>
			</div>

			<div className="grid grid-cols-4 gap-2 px-10">
				{isLoading ? (
					<div>Loading...</div>
				) : (
					newsList.articles.map((article, index) => (
						<NewsCard key={index} article={article} />
					))
				)}
			</div>
		</>
	);
};

export default NewsList;
