/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'drive.google.com',
                port: '',
                pathname: '/**', // Cho phép tất cả các đường dẫn từ Google Drive
            },
        ],
    },
};

export default nextConfig;