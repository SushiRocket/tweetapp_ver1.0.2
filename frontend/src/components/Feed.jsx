// frontend/src/Feed.jsx

import React, { useState, useEffect, useRef } from "react";
import API from "../api";

function Feed() {
    const [tweets, setTweets] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // WebSocketのリファレンス
    const wsRef = useRef(null);

    useEffect(() => {
        API.get("tweets/")
            .then((res) =>  {
              setTweets(res.data);
            })
            .catch((err) =>  {
              console.error(err);
              setError("Failed to load tweets.");
            })
            .finally(() => setLoading(false));

        // WebSocket接続
        const wsUrl = `ws://localhost:8000/ws/tweets/`; // asgi.pyで設定
        const socket = new WebSocket(wsUrl);
        wsRef.current = socket;

        socket.open = () => {
            console.log("WebSocket connected for Feed!");
        };

        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log("New message from WS:", data);
            if (data.type === "tweet_message") {
                // 新しいツイートが届いた
                setTweets((prev) => [data.tweet, ...prev]);
            } 
        };

        socket.onerror = (err) => {
            console.error("WebSocket error:", err);
          };
      
          socket.onclose = () => {
            console.log("WebSocket closed for Feed.");
            // 必要に応じて再接続処理
          };
      
          // コンポーネントアンマウント時にソケット切断
          return () => {
            if (wsRef.current) {
              wsRef.current.close();
            }
          };
    }, []);

    if (loading) return <p>Loading feed...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
          <h2>Real-time Feed</h2>
          {tweets.map((tweet) => (
            <div key={tweet.id} className="border p-2 mb-2">
              <p><strong>{tweet.username}</strong> - {tweet.content}</p>
              <small>{tweet.created_at}</small>
            </div>
          ))}
        </div>
    );
}

 export default Feed;