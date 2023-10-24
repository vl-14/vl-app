import { Button, Layout, SignIn } from "@/components";
import { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session, getServerSession } from "next-auth";

export default function Home({
	cleanedSession,
}: {
	cleanedSession: Session | boolean;
}) {
	return (
		<Layout>
			<div className="flex flex-col justify-center items-center h-full">
				<div className="mb-8 shadow-xl rounded-full overflow-hidden">
					<Image
						src="/logo.png"
						alt="LunaDream Logo"
						width={500}
						height={500}
						priority={true}
					/>
				</div>

				<h1 className="text-4xl font-bold text-center mb-4">
					Welcome to LunaDream
				</h1>
				{cleanedSession ? (
					<div className="flex">
						<Button linkTo="/dashboard" classNames="mx-2">
							<h4 className="font-bold mt-4 text-center mb-4 ">
								See how backend handles sorting!
							</h4>
						</Button>
						<Button linkTo="/sortfe" classNames="mx-2">
							<h4 className="font-bold mt-4 text-center mb-4 ">
								See how frontend handles sorting!
							</h4>
						</Button>
					</div>
				) : (
					<SignIn>Login Here!</SignIn>
				)}
			</div>
		</Layout>
	);
}

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const session = await getServerSession(
		context.req,
		context.res,
		authOptions
	);

	const cleanedSession = session?.user || false;
	return { props: { cleanedSession } };
};
