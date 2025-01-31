// frontend/src/api/index.js

import axios from 'axios';

// APIベースURLの設定
const API = axios.create({
    baseURL: 'https://tweetapp-ver1-0-2-2rdo.onrender.com/api/',
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
                const res = await axios.post('http://localhost:8000/api/token/refresh/', {refresh: refreshToken});
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