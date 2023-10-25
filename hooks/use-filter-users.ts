import { getUsersData } from "@/redux/slices/userSlice";
import { useAppSelector } from "@/hooks/index";
import { useMemo } from "react";
import { FilterCriteria, FilterMethod, FilterOperation } from "@/types/hooks";

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

export const useFilteredUsers = (
	filterCriteria: FilterCriteria[],
	operation: FilterOperation
) => {
	const { data: users } = useAppSelector(getUsersData);

	return useMemo(() => {
		if (filterCriteria.length === 0) return users;

		return users.filter((user) => {
			const conditions = filterCriteria.map((criteria) =>
				methodFunctions[criteria.method](
					user[criteria.criteria],
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
	}, [users, filterCriteria, operation]);
};
