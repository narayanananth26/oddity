import { apiUrl } from "@utils/constants/links";

export const getAllEvents = async () => {
	const res = await fetch(`${apiUrl}/events/live`, {
		next: { revalidate: 60 },
	});
	if (!res) throw new Error("Failed to fetch live events");
	return await res.json();
};
