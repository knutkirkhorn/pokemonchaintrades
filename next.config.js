/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		typedRoutes: true,
	},
	eslint: {
		dirs: ['app', 'components', 'lib'],
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'raw.githubusercontent.com',
				port: '',
				pathname: '/PokeAPI/sprites/master/sprites/pokemon/**',
			},
		],
	},
};

module.exports = nextConfig;
