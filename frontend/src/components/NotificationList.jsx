// frontend/src/components/NotificationList.jsx
import React, { useState, useEffect } from "react";
import API from "../api";

function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("notifications/"); // GET /api/notifications/
      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError("Failed to load notifications");
    }
    setLoading(false);
  };

  // 全件既読
  const markAllAsRead = async () => {
    try {
      await API.patch("notifications/mark_all/"); // あるいはPUT,POST, etc. 形は自由
      // 全件既読になったら state も反映
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  // 1件既読
  const markOneAsRead = async (id) => {
    try {
      await API.patch(`notifications/${id}/mark_read/`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  if (loading) return <p>Loading notifications...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white p-4">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      <button onClick={markAllAsRead} className="bg-blue-500 text-white px-3 py-1 rounded mb-2">
        Mark All as Read
      </button>

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((notif) => (
          <div key={notif.id} className="border-b py-2">
            <p className="text-sm">
              From: <strong>{notif.sender_username}</strong>
            </p>
            <p className="text-sm">{notif.message}</p>
            <small className="text-gray-500">
              {new Date(notif.created_at).toLocaleString()}
            </small>

            {!notif.is_read && (
              <button
                onClick={() => markOneAsRead(notif.id)}
                className="text-blue-500 ml-4"
              >
                Mark as Read
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default NotificationList;
