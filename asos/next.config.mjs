/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: (config, { dev }) => {
        // Disable caching in development
        if (dev) {
            config.cache = false;
        }
        return config;
    },
};

export default nextConfig;
