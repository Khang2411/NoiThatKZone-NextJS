/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: "/api/auth/:path*",
                destination: "/api/auth/:path*",
            },
            {
                source: '/api/:path*',
                destination: `${process.env.API_URL}/api/:path*`, // Proxy to Backend
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
            },
            {
                protocol: 'https',
                hostname: 'homeoffice.com.vn',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            },
            {
                protocol: 'https',
                hostname: 'nhaxinh.com'
            }
        ],
    }
}

module.exports = nextConfig
