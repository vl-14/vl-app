/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "reqres.in",
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/api/backend/:path*",
				destination: "/api/proxy/:path*",
			},
		];
	},
};

module.exports = nextConfig;
