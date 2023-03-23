export const API_URLS = {
    HTTP : "http://",
    HTTPS : "https://",
    DOMAIN : "localhost",
    COLON : ":",
    PORT : "3000",
    ENDPOINTS : {
        API_USER_CHECK_USERNAME : "/api/user/check-username",
        API_USER_CREATE_USER : "/api/user/create-user"
    }
};

export const API_ENDPOINTS = {
    CHECK_USERNAME : `${API_URLS.HTTP}${API_URLS.DOMAIN}${API_URLS.COLON}${API_URLS.PORT}${API_URLS.ENDPOINTS.API_USER_CHECK_USERNAME}`,
    CREATE_USER : `${API_URLS.HTTP}${API_URLS.DOMAIN}${API_URLS.COLON}${API_URLS.PORT}${API_URLS.ENDPOINTS.API_USER_CREATE_USER}`
};