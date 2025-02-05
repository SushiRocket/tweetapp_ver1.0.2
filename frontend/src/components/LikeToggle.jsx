// frontend/src/components/LikeToggle.jsx

import React, { useState } from "react";
import API from "../api";

// TweetItem.jsxからprops(tweetID, initialLiked, initialLikeCount)を受け取る
const LikeToggle = ({ tweetId, initialLiked, initialLikeCount }) => {
    const [liked, setLiked] = useState(initialLiked);
    const [likeCount, setLikeCount] = useState(initialLikeCount || 0);

    const handleLike = async () => {
        try {
            const res = await API.post(`tweets/${tweetId}/like/`);
            console.log("Like Response:", res.data);
            setLiked(true);
            setLikeCount((prev) => prev + 1);
        } catch (error) {
            console.error("Error liking tweet:", error);
        }
    };

    const handleUnlike = async () => {
        try {
            const res = await API.delete(`tweets/${tweetId}/unlike/`);
            console.log("Unlike Response:", res.data)
            setLiked(false);
            setLikeCount((prev) => Math.max(prev - 1, 0));
        } catch (error) {
            console.error("Error unliking tweet:", error);
        }
    };

    return (
        <div>
            <span>{likeCount} Likes</span>
            {liked ? (
                <button onClick={handleUnlike} className="text-red-500">
                    Unlike
                </button>
            ) : (
                <button onClick={handleLike} className="text-blue-500">
                    Like
                </button>
            )}
        </div>
    );
};

export default LikeToggle;