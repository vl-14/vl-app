import { useSession } from "next-auth/react";
import Image from "next/image";
import { SignIn, SignOut } from "@/components";
import { AuthProps } from "@/types/components";

const Auth = ({
	signInText,
	signOutText,
	disableImage = false,
	disableName = false,
}: AuthProps) => {
	const { data: session } = useSession();

	return (
		<>
			{session?.user ? (
				<>
					{!disableImage && (
						<div className="h-8 w-8 flex align-center relative mr-2 rounded-full overflow-hidden">
							<Image
								src={
									session?.user?.image ||
									"/default-avatar.png"
								}
								width={500}
								height={500}
								alt="User Avatar"
							/>
						</div>
					)}

					{!disableName && (
						<span className="mr-4 text-gray-800 text-lg">
							{session?.user?.name}
						</span>
					)}
					<SignOut>{signOutText}</SignOut>
				</>
			) : (
				<SignIn>{signInText}</SignIn>
			)}
		</>
	);
};

export default Auth;
