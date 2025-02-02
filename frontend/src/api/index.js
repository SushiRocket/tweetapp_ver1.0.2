// frontend/src/api/index.js

import axios from 'axios';

// APIベースURLの設定
export const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/';

// 環境変数が正しく取得できているか確認
console.log("API_BASE_URL:", process.env.REACT_APP_API_BASE_URL);

const API = axios.create({
    baseURL: API_BASE_URL,
});

// リクエストインターセプターでAuthorizationヘッダーを自動設定
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//レスポンスインターセプターでトークンリフレッシュを自動化（オプション）
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.data.status === 401 &&
            !originalRequest._retry &&
            localStorage.getItem('refresh_token')
        ) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');
            try {
                const res = await axios.post(`${API_BASE_URL}token/refresh/`, {refresh: refreshToken});
                const newAccessToken = res.data.access;
                localStorage.setItem('access_token', newAccessToken);
                API.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return API(originalRequest);
            } catch (err) {
                console.error('Refresh token expired', err)
                // 必要な場合はログアウト処理ここで
            }
        }
        return Promise.reject(error);
    } 
);

export default API;