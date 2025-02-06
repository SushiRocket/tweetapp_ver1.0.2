// frontend/src/components/CommentList.jsx

import React, { useState, useEffect } from "react";
import API from "../api";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

const CommentList = ({ tweetId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tweetId) return;
    setLoading(true);
    setError("");

    // GET /api/tweets/<tweetId>/comments/
    API.get(`tweets/${tweetId}/comments/`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.error("Error fetching comments:", err);
        setError("Failed to load comments.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tweetId]);

  // 新規コメントが追加されたとき
  const handleCommentAdded = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  // コメントが更新されたとき
  const handleCommentUpdate = (updatedComment) => {
    setComments((prev) =>
      prev.map((c) => (c.id === updatedComment.id ? updatedComment : c))
    );
  };

  // コメントが削除されたとき
  const handleCommentDelete = (deletedId) => {
    setComments((prev) => prev.filter((c) => c.id !== deletedId));
  };

  if (loading) {
    return <p>Loading comments...</p>;
  }
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
      <h4 className="font-bold mb-2">Comments ({comments.length})</h4>

      {/* 新規投稿フォーム */}
      <CommentForm tweetId={tweetId} onCommentAdded={handleCommentAdded} />

      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            tweetId={tweetId}
            comment={comment}
            onUpdate={handleCommentUpdate}
            onDelete={handleCommentDelete}
          />
        ))
      ) : (
        <p className="text-gray-500">No comments yet.</p>
      )}
    </div>
  );
};

export default CommentList;