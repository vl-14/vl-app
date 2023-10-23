import { Button } from "@/components";
import { signOut } from "next-auth/react";
import { ReactNode } from "react";

type SignOutProps = {
	children?: ReactNode;
};

const SignOut = ({ children = "Logout" }: SignOutProps) => {
	return (
		<Button handleClick={() => signOut({ callbackUrl: "/" })}>
			{children}
		</Button>
	);
};

export default SignOut;
