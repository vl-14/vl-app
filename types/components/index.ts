import { ReactNode } from "react";

export type ButtonProps = {
	children: ReactNode;
	handleClick?: () => void;
	linkTo?: string;
	classNames?: string;
	size?: string;
};

export type FooterProps = {
	isLight?: boolean;
	textCenter?: boolean;
	textSize?: string;
	classNames?: string;
};

export type UserProfileProps = {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	avatar: string;
};

export type AuthProps = {
	signInText?: string;
	signOutText?: string;
	disableImage?: boolean;
	disableName?: boolean;
};
