const devConfig = {
    baseURL: process.env.REACT_APP_API_BASE_URL || 'https://localhost:5001',
};

const prodConfig = {
    baseURL: 'Your production url',
};

export const config = devConfig;
