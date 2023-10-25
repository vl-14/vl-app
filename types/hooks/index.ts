export type Criteria = "first_name" | "last_name";

export type FilterMethod = "startsWith" | "endsWith" | "contains" | "equals";

export type FilterOperation = "AND" | "OR"; // Add more operations as needed

export type FilterCriteria = {
	criteria: Criteria;
	method: FilterMethod;
	searchText: string;
};
