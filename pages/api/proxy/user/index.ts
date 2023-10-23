import axios from "axios";
import { User } from "@/types/api";
import { NextApiRequest, NextApiResponse } from "next";

const fetchData = async (
	req: NextApiRequest,
	{ page, aggregatedData = [] }: { page: number; aggregatedData?: User[] }
): Promise<any[]> => {
	const response = await axios.get(
		`${process.env.APIURL}api/users?page=${page}`
	);

	const { data, total_pages } = response.data;
	const allData = [...aggregatedData, ...data];

	if (page < total_pages) {
		return fetchData(req, {
			page: page + 1,
			aggregatedData: allData,
		});
	}

	return allData;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const allData = await fetchData(req, {
		page: 1,
	});
	const filteredData = allData
		.sort((a, b) => a.id - b.id)
		.filter(
			(item) =>
				item.first_name.startsWith("G") ||
				item.last_name.startsWith("W")
		);

	res.status(200).json(filteredData);
}
