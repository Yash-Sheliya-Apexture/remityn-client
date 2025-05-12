// ./src/app/config/apiConfig.js

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// 1. Assign the configuration object to a named constant
const apiConfig = {
    baseUrl: apiBaseUrl,
    // You could add other API-related configurations here in the future
};

// 2. Export the named constant as the default
export default apiConfig;