import Image from "next/image";
import Link from "next/link";

const NewsCard = ({ article }) => {
	return (
		<div className="news-item bg-white p-4 rounded-md shadow-md border">
			<Image
				src={article.urlToImage || "/assets/image-placeholder.webp"}
				alt={article.title}
				width={1000}
				height={1000}
				className="mb-4 rounded-md"
			/>
			<h2 className="text-xl font-bold mb-2">{article.title}</h2>
			<p className="text-gray-700 mb-2">{article.description}</p>
			<p className="text-gray-500 mb-2">Author: {article.author}</p>
			<p className="text-gray-500 mb-2">
				Published at: {new Date(article.publishedAt).toLocaleString()}
			</p>
			<Link
				href={article.url}
				target="_blank"
				rel="noopener noreferrer"
				className="text-red-500 hover:underline"
			>
				Read more
			</Link>
		</div>
	);
};

export default NewsCard;
