// frontend/src/components/TweetForm.jsx

import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import API from "../api";

function TweetForm({ onTweetCreated }) {
    const{ accessToken } = useContext(AuthContext);
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // バリデーション、空白は送信しない
        if (!content.trim()) {
            setError("Tweet content cannot be empty!");
            return;
        }

        setLoading(true);
        try {
            const res = await API.post(
                "tweets/", 
                { content },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            onTweetCreated(res.data);
            setContent("");
        } catch (err) {
            console.error("Failed to post tweet", err);
            setError("Failed to post tweet.please try again.");
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}

            <textarea
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening?"
                rows="3"
                required
            ></textarea>

            <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                {loading ? "Posting..." : "Tweet"}
            </button>
        </form>
    );
}

export default TweetForm;