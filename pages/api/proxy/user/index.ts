import { ResReqUser } from "@/types/api";
import { NextApiRequest, NextApiResponse } from "next";
import { GET_USER } from "@/pages/api/_utils/constant";
import execAxios from "@/pages/api/_utils/execAxios";
import { AxiosResponse } from "axios";
import errorAxios from "../../_utils/errorAxios";
import { FilterCriteria, FilterMethod, FilterOperation } from "@/types/hooks";

interface FetchDataParams {
	page: number;
	aggregatedData?: ResReqUser[];
}

//This will fetch all datas recursively until the end of total_pages.
export const fetchAllData = async (
	req: NextApiRequest,
	res: NextApiResponse,
	{ page, aggregatedData = [] }: FetchDataParams
): Promise<ResReqUser[]> => {
	try {
		const response = (await execAxios({
			method: "GET",
			endPoint: GET_USER(`page=${page}`), //Maintain all API Urls as constants. In case BE changes address.
			req,
		})) as AxiosResponse;
		const { data, total_pages } = response.data;

		const allData: ResReqUser[] = [...aggregatedData, ...data];

		if (page < total_pages) {
			return fetchAllData(req, res, {
				page: page + 1,
				aggregatedData: allData,
			});
		}
		return allData;
	} catch (error: any) {
		errorAxios(error, res);
		throw new Error(error);
	}
};

const caseInsensitive = (method: (str: string, search: string) => boolean) => {
	return (str: string, search: string) => {
		const lowerStr = str.toLowerCase();
		const lowerSearch = search.toLowerCase();
		return method(lowerStr, lowerSearch);
	};
};

const methodFunctions: Record<
	FilterMethod,
	(str: string, search: string) => boolean
> = {
	startsWith: caseInsensitive((str, search) => str.startsWith(search)),
	endsWith: caseInsensitive((str, search) => str.endsWith(search)),
	contains: caseInsensitive((str, search) => str.includes(search)),
	equals: caseInsensitive((str, search) => str === search),
};

export const filterUsers = (
	users: ResReqUser[],
	filterCriteria: FilterCriteria[],
	operation: FilterOperation
): ResReqUser[] => {
	if (filterCriteria.length === 0) return users;

	return users.filter((user) => {
		const conditions = filterCriteria.map((criteria) =>
			methodFunctions[criteria.method](
				user[criteria.criteria as keyof ResReqUser],
				criteria.searchText
			)
		);

		if (operation === "AND") {
			return conditions.every(Boolean);
		} else if (operation === "OR") {
			return conditions.some(Boolean);
		}

		// Handle more operations here if needed

		return true; // Default
	});
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
			case "FILTERED_DATA":
				const { filterCriteria, operation } = req.body;
				returnedData = filterUsers(allData, filterCriteria, operation);
				break;
			case "ALL_DATA":
			default:
				returnedData = allData;
		}

		return res.status(200).json(returnedData);
	} catch (error: any) {
		errorAxios(error, res);
	}
}
