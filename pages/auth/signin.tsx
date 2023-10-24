import { Layout, SignIn as AuthSignIn } from "@/components";

const SignIn = () => {
	return (
		<Layout>
			<div className="flex flex-col justify-center items-center h-full">
				<h1 className="text-4xl font-bold text-center my-4">
					Oops, unauthorized access!
				</h1>
				<div className="my-4">
					<AuthSignIn>Login Here!</AuthSignIn>
				</div>
			</div>
		</Layout>
	);
};

export default SignIn;
