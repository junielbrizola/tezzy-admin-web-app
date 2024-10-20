/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb', // Set to your desired limit (e.g., '5mb' for 5 MB)
        },
    },
};

export default nextConfig;
