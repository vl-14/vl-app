import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button, Modal, SignIn } from "@/components";
import { AuthProps } from "@/types/components";
import { useDispatch } from "react-redux";
import { handleShowingModal } from "@/redux/slices/modalSlice";

const Auth = ({
	signInText,
	disableImage = false,
	disableName = false,
}: AuthProps) => {
	const { data: session } = useSession();

	const dispatch = useDispatch();

	const handleOpenConfirmModal = () => {
		dispatch(
			handleShowingModal({
				type: "CONFIRM",
			})
		);
	};

	const handleConfirm = () => {
		signOut({ callbackUrl: "/" });
	};

	return (
		<>
			{session?.user ? (
				<>
					{!disableImage && (
						<div className="h-8 w-8 align-center relative mr-2 rounded-full overflow-hidden hidden md:flex">
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
						<span className="mr-4 text-gray-800 text-lg hidden md:inline">
							{session?.user?.name}
						</span>
					)}
					<Button handleClick={handleOpenConfirmModal}>Logout</Button>
					<Modal handleConfirm={handleConfirm}>
						<p>Are you sure you want to logout?</p>
					</Modal>
				</>
			) : (
				<SignIn>{signInText}</SignIn>
			)}
		</>
	);
};

export default Auth;
