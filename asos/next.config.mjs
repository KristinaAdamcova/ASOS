import withPWA from '@ducanh2912/next-pwa';

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

export default withPWA({
    dest: 'public', // PWA assets location
    disable: process.env.NODE_ENV === 'development', // Disable PWA in development
    ...nextConfig, // Include your existing config
});
