import { ButtonProps } from "@/types/components";
import { computeClassName } from "@/utils";
import Link from "next/link";

const Button = ({
	children,
	handleClick,
	linkTo,
	size = "md",
	classNames = "",
}: ButtonProps) => {
	let classes = computeClassName(`btn ${classNames}`, {
		"btn-{value}": size,
	});

	if (linkTo) {
		return (
			<Link href={linkTo} className={classes}>
				{children}
			</Link>
		);
	}

	return (
		<button className={classes} onClick={handleClick}>
			{children}
		</button>
	);
};

export default Button;
