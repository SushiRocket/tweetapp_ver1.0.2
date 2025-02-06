// frontend/src/components/CommentForm.jsx

import React, { useState } from "react";
import API from "../api";

const CommentForm = ({tweetId, onCommentAdded }) => {
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!content.trim()) {
            setError("Comment cannot be empty. Please try again.");
            return;
        }

        console.log("POST to /api/tweets/<tweetId>/comments/:", { content });

        try {
            const res = await API.post (`tweets/${tweetId}/comments/`, { content });
            console.log("Commented Successfull.:", res.data);

            // 親コンポーネントへ新しいコメントを通知
            if (onCommentAdded) {
                onCommentAdded(res.data);
            }
            setContent(""); //入力フォームをクリア
        } catch (err) {
            console.error("Failed to post comment.:", err);
            setError("Failed to post comment. Please try again.");
        }
    };

    return (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <form onSubmit={handleSubmit} className="flex flex-col">
                {error && <p className="text-red-500 text-sm">a{error}</p>}
                <textarea
                    className="w-full p-2 border rounded dark:text-black"
                    placeholder="Write comment..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="2"
                    required
                />
                <button
                    type="submit"
                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
                >
                    Comment
                </button>
            </form>
        </div>
    );
};

export default CommentForm;