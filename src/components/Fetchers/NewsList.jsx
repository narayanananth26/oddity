"use client";
import NewsCard from "@components/Cards/NewsCard";
import LoadingNewsCard from "@components/Loading/LoadingNewsCard";
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

	return (
		<div className="grid grid-cols-4 gap-2 px-10">
			{isLoading ? (
				<>
					<LoadingNewsCard />
					<LoadingNewsCard />
					<LoadingNewsCard />
					<LoadingNewsCard />
				</>
			) : (
				newsList.map((article, index) => (
					<NewsCard key={index} article={article} />
				))
			)}
		</div>
	);
};

export default NewsList;
