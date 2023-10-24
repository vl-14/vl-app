import { ReactNode } from "react";
import { Header, Footer } from "@/components";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { formatTitle } from "@/utils";

const inter = Inter({
	subsets: ["latin"],
});

type Layout = {
	children: ReactNode;
};

const Layout = ({ children }: Layout) => {
	const router = useRouter();
	const title = formatTitle(router.pathname);
	const noTitle = ["", "Auth Signin"];

	return (
		<section
			className={`${inter.className} font-sans flex flex-col min-h-screen`}
		>
			<Header />
			<main className="flex-grow p-4 md:p-8 lg:p-16 mx-auto max-w-screen-xl">
				{!noTitle.includes(title) && (
					<h1 className="text-2xl md:text-4xl font-bold text-gray-900 my-4">
						{title}
					</h1>
				)}
				<div className="bg-basic-grey p-4">{children}</div>
			</main>
			<Footer />
		</section>
	);
};

export default Layout;
