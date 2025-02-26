// frontend/src/api/dm.js

import { getAccessToken } from "../utils/auth";

export function connectDMWebSocket(username) {
    const token = getAccessToken(); // JWTトークンを取得
    const wsUrl = `ws://localhost:8000/ws/dm/${username}/?token=${token}`;

    console.log("Connect WebSocket:", wsUrl);

    return new WebSocket(wsUrl);
}