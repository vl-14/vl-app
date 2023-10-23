import { UserProfileProps } from "@/types/components";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components";

interface ProfileCardProps {
	profile: UserProfileProps;
}

const UserProfile = ({
	profile: { avatar, first_name, last_name, email },
}: ProfileCardProps) => {
	const [showEmail, setShowEmail] = useState(false);
	return (
		<div className="bg-basic-grey p-4 border rounded-lg shadow-md min-w-[500px] flex flex-col justify-between">
			<div className="flex justify-center">
				<Image
					src={avatar}
					alt={`${first_name} ${last_name}`}
					width={100}
					height={100}
					className="rounded-full"
				/>
			</div>
			<div className="flex flex-col">
				<h3 className="text-lg font-bold mt-2">{`${first_name} ${last_name}`}</h3>
				<div className="mt-2 flex justify-between">
					<Button
						classNames="mr-2"
						size="sm"
						handleClick={() => setShowEmail(!showEmail)}
					>
						{showEmail ? "Hide" : "Show"} Email
					</Button>
					<div className="flex items-center">
						{showEmail && <p>{email}</p>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
