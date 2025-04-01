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
            },
            {
                protocol: "https",
                hostname:"calmspce-all-image.s3.ap-south-1.amazonaws.com"
            }
        ]
    }
};

export default nextConfig;
