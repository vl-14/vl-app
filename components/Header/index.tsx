import { Auth } from "@/components";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
	return (
		<header className="bg-basic-gray shadow-lg p-4">
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex items-center flex-shrink-0">
					<div className="h-12 w-12 relative mr-3">
						<Link href="/">
							<Image
								src="/logo.png"
								className="neumorphic-image"
								width={600}
								height={600}
								alt="Logo"
							/>
						</Link>
					</div>
					<span className="text-xl font-semibold">LunaDream</span>
				</div>
				<div className="flex items-center">
					<Link href="/">
						<p className="mx-4 underline underline-offset-2">
							Home
						</p>
					</Link>
					<Auth />
				</div>
			</div>
		</header>
	);
};

export default Header;
