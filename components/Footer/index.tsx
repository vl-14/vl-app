import { FooterProps } from "@/types/components";
import { computeClassName } from "@/utils";

const Footer = ({
	isLight = true,
	textCenter = true,
	textSize = "xs",
	classNames = "",
}: FooterProps) => {
	let classes = computeClassName(`${classNames} py-4`, {
		"bg-basic-grey": isLight,
		"text-{value}": textSize,
		"text-center": textCenter,
	});

	return (
		<footer className={classes}>
			&copy; {new Date().getFullYear()} LunaDream. All rights reserved.
		</footer>
	);
};

export default Footer;
