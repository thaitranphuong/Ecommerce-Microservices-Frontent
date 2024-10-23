module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8080',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'localhost',
                port: '5001',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    // async redirects() {
    //     return [
    //         {
    //             source: '/',
    //             destination: '/home',
    //             permanent: true,
    //         },
    //     ];
    // },
};
