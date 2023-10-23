import { Button } from "@/components";
import { signIn } from "next-auth/react";
import { ReactNode } from "react";

type SignInProps = {
	children?: ReactNode;
};

const SignIn = ({ children = "Login" }: SignInProps) => {
	return (
		<Button handleClick={() => signIn("google", { callbackUrl: "/" })}>
			{children}
		</Button>
	);
};

export default SignIn;
