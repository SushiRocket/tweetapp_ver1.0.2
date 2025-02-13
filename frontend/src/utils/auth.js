// frontend/src/utils/auth.js

export function getAccessToken() {
    return localStorage.getItem("access_token");
}