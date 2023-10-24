import { User } from "@/types/api";
import { NextApiRequest, NextApiResponse } from "next";
import _axios from "@/pages/api/_utils/_axios";
import { GET_USER } from "@/pages/api/_utils/constant";

interface FetchDataParams {
	page: number;
	aggregatedData?: User[];
}

export const fetchAllData = async (
	req: NextApiRequest,
	res: NextApiResponse,
	{ page, aggregatedData = [] }: FetchDataParams
): Promise<User[]> => {
	try {
		const response = await _axios({
			method: "GET",
			endpoint: GET_USER(`page=${page}`),
			req,
			res,
			withAuth: true,
		});
		const { data, total_pages } = response.data;

		const allData: User[] = [...aggregatedData, ...data];

		if (page < total_pages) {
			return fetchAllData(req, res, {
				page: page + 1,
				aggregatedData: allData,
			});
		}
		return allData;
	} catch (error) {
		console.error("Fetch Data Error:", error);
		throw new Error("Failed to fetch data");
	}
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const allData = await fetchAllData(req, res, { page: 1 });

		const { wish } = req.body;
		let returnedData = [];

		switch (wish) {
			case "BACKEND_SORT":
				returnedData = allData.filter(
					(item) =>
						item.first_name.startsWith("G") ||
						item.last_name.startsWith("W")
				);
				break;
            case "FRONTEND_SORT":
                returnedData = allData;
			default:
				returnedData = allData.filter(
					(item) =>
						item.first_name.startsWith("G") ||
						item.last_name.startsWith("W")
				);
		}

		return res.status(200).json(returnedData);
	} catch (error) {
		console.error("API Error:", error);
		return res.status(500).end("Internal Server Error");
	}
}
