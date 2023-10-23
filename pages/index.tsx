import { Button, Layout, SignIn } from "@/components";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
	const { data: session } = useSession();
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
				{session?.user ? (
					<Button linkTo="/dashboard">
						<h4 className="font-bold mt-4 text-center mb-4 ">
							Go to Dashboard!
						</h4>
					</Button>
				) : (
					<SignIn>Login Here!</SignIn>
				)}
			</div>
		</Layout>
	);
}
