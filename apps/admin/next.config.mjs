/** @type {import('next').NextConfig} */
const nextConfig = {
	basePath: process.env.BASEPATH,
	images: {
		unoptimized: true
	}
};

export default nextConfig;
