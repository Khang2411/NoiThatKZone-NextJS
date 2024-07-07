/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/auth/:path*",
                destination: "/api/auth/:path*"
            },
             {
                 source: '/api/:path*',
                 destination: `https://admin.noithatkzone.shop/api/:path*`, // Proxy to Backend
             }
        ]
    },
    images: {
        remotePatterns: [
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
    },
    env: {
        APP_NAME: process.env.NEXT_PUBLIC_NAME,
    },
}

module.exports = nextConfig
