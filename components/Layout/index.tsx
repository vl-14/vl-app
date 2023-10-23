import { ReactNode } from "react";
import { Header, Footer } from "@/components";
import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
});

type Layout = {
	children: ReactNode;
};

const Layout = ({ children }: Layout) => {
	return (
		<section
			className={`${inter.className} font-sans flex flex-col min-h-screen`}
		>
			<Header />
			<main className="flex-grow p-4 md:p-8 lg:p-16 mx-auto max-w-screen-xl">
				<div className="bg-basic-grey p-4">{children}</div>
			</main>
			<Footer />
		</section>
	);
};

export default Layout;
