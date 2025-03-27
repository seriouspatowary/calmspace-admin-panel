/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "icon-library.com",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            }
        ]
    }
};

export default nextConfig;
