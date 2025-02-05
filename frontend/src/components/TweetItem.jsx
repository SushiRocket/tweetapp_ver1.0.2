// frontend/src/components/TweetItem.jsx

import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import API from "../api";
import LikeToggle from "./LikeToggle";

function TweetItem({ tweet, onDelete }) {
    const { user } =useContext(AuthContext);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] =useState(false);

    const handleDelete = async () => {
        setError(null);
        setDeleting(true);
        try {
            await API.delete(`tweets/${tweet.id}`);
            onDelete(tweet.id);
        } catch (err) {
            console.error("Failed to delete tweet", err)
            setError("Failed to delete tweet.Please try again.");
        }
        setDeleting(false)
    };

    return (
        <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <strong>@{tweet.username}</strong>
                    <span className="text-sm text-gray--500 ml-2">{new Date(tweet.created_at).toLocaleDateString()}</span>
                </div>
                {user && user.id === tweet.user && (
                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className={`text-red-500 hover:text-red-700 ${deleting ? "opacity-50 cursor-not-allowed": ""}`}
                    >
                        {deleting ? "Deleting...": "Delete"}
                    </button>
                )}
            </div>
            <p className="text-gray-800">{tweet.content}</p>

            <LikeToggle
                tweetId={tweet.id}
                initialLiked={tweet.user_hasliked}
                initialLikeCount={tweet.likes_count || 0}
            />
            {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
    );
}

export default TweetItem;