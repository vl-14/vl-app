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
