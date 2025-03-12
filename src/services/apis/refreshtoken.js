import apiService from "../interceptor";

const refreshToken = async () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
        throw new Error("No token or refresh token found");
    }

    const response = await apiService.post("/api/auth/refresh-token", {
        token,
        refreshToken
    });

    return response.data;
};

export default refreshToken;
