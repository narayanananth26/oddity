"use client";
import UnderConstruction from "@components/UI/UnderConstruction";
import { getAllNews } from "@utils/fetch-functions/getAllNews";
import Image from "next/image";
import { useEffect, useState } from "react";

export const metadata = {
	title: "News",
};

const News = () => {
	const [news, setNews] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchNews = async () => {
			try {
				const news = await getAllNews();
				setNews(news);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setIsLoading(false);
			}
		};

		fetchNews();
	}, [isLoading]);

	const articles = news.articles;
	console.log(articles);

	return (
		<div>
			{!isLoading &&
				articles.map((article, index) => (
					<div key={index} className="news-item">
						<Image
							src={article.urlToImage || "assets/oddity-logo.svg"}
							alt={article.title}
							width={20}
							height={20}
						/>
						<h2>{article.title}</h2>
						<p>{article.description}</p>
						<p>Author: {article.author}</p>
						<p>
							Published at:{" "}
							{new Date(article.publishedAt).toLocaleString()}
						</p>
						<a
							href={article.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							Read more
						</a>
					</div>
				))}
		</div>
	);
};

export default News;
