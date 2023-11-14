import { apiUrl } from "@utils/constants/links";

export const getAllNews = async () => {
	const res = await fetch(`${apiUrl}/news`, {
		next: { revalidate: 60 },
	});
	if (!res) throw new Error("Failed to fetch news");
	return await res.json();
};
