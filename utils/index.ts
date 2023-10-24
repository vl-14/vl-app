import { ClassConfig } from "@/types/utils";

export const computeClassName = (base: string, config: ClassConfig): string => {
	const classes = Object.entries(config)
		.filter(([key, value]) =>
			typeof value === "boolean" ? value : !!value
		)
		.map(([key, value]) => {
			if (typeof value === "string") {
				return key.replace("{value}", value);
			}
			return key;
		});

	return [base, ...classes].join(" ");
};

export const formatTitle = (path: string): string => {
	const formattedPath = path.startsWith("/") ? path.slice(1) : path;
	const segments = formattedPath.split("/");
	const title = segments
		.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
		.join(" ");

	return title;
};
