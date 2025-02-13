// frontend/src/components/DM.jsx

import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import { connectDMWebSocket } from "../api/dm";
import { AuthContext } from "../contexts/AuthContext";

function DMPage() {
  const { userId } = useParams(); // URLパラメータの相手ユーザーID
  const { user } = useContext(AuthContext);
  const currentUserId = user ? user.id : null;
  const [messages, setMessages] = useState([]);
  const [inputContent, setInputContent] = useState("");
  const socketRef = useRef(null);

  // useCallback を使ってfetchDMHistoryをメモ化
  const fetchDMHistory = useCallback(async () => {
    try {
      const res = await API.get(`dm/?user=${userId}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch DM history:", err);
    }
  }, [userId]);  // `userId` を依存関係に追加

  // fetchDMHistoryをuseEffectの依存配列に追加
  useEffect(() => {
    fetchDMHistory();
  }, [fetchDMHistory]); 

  // 2) WebSocket接続
  useEffect(() => {
    const socket = connectDMWebSocket(userId);  // WebSocket接続関数を使用
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("DM WebSocket connected");
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("DM message received:", data);
      if (data.dm_id) {
        setMessages((prev) => [...prev, data]);
      }
    };
    socket.onerror = (err) => {
      console.error("DM WebSocket error:", err);
    };
    socket.onclose = () => {
      console.log("DM WebSocket closed");
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [userId]);

  // 3) メッセージ送信
  const sendMessage = () => {
    if (!socketRef.current || !inputContent.trim()) return;
    socketRef.current.send(JSON.stringify({ content: inputContent }));
    setInputContent("");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">DM with User {userId}</h2>

      <div className="border p-4 mb-4 "style={{ height: '300px', overflowY: 'auto' }}>
        {messages.map((msg, idx) => {
          console.log("message obj =>", msg);
          console.log(" msg.sender =>", msg.sender, "type:", typeof msg.sender);
          console.log(" currentUserId =>", currentUserId, "type:", typeof currentUserId);          const isMyMessage = (parseInt(msg.sender) === parseInt(currentUserId));
          console.log("isMyMessage =>", isMyMessage);
          return(
            <div key={idx} className={`flex w-full mb-2 ${isMyMessage ? "justify-end" : "justify-start"}`}>
              <div className={`rounded p-2 max-w-sm ${isMyMessage ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                {msg.content}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // エンターでフォームが送信されないようにする
              sendMessage();
            }
          }}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default DMPage;
