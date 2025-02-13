// frontend/src/components/TweetItem.jsx

// src/components/TweetItem.jsx
import React, { useState } from "react";
import CommentList from "./CommentList";
import LikeToggle from "./LikeToggle";
import { Link } from "react-router-dom";

const TweetItem = ({ tweet, onDelete }) => {
  const [showComments, setShowComments] = useState(false);

  const handleDeleteTweet = () => {
    if (!window.confirm("Delete this tweet?")) return;
    // 親から受け取った onDelete があれば呼ぶ
    if (onDelete) {
      onDelete(tweet.id);
    }
  };

  return (
    <div className="border p-4 mb-4">
      <p className="font-bold">
        <Link to={`/users/${tweet.username}/profile`} className="text-blue-500 hover:underline">
          {tweet.username}
        </Link>
      </p>
      <p>{tweet.content}</p>
      <small className="text-gray-500">
        {new Date(tweet.created_at).toLocaleString()}
      </small>

      <div className="mt-2 flex items-center gap-4">
        <LikeToggle
            tweetId={tweet.id}
            initialLiked={tweet.user_has_liked}
            initialLikeCount={tweet.likes_count}
        />

        <button
          onClick={() => setShowComments(!showComments)}
          className="text-blue-500 mr-2"
        >
          {showComments ? "Hide Comments" : "Show Comments"}
        </button>
        <button
          onClick={handleDeleteTweet}
          className="text-red-500"
        >
          Delete Tweet
        </button>
      </div>

      {showComments && (
        <CommentList tweetId={tweet.id} />
      )}
    </div>
  );
};

export default TweetItem;
