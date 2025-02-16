import React, { useState, useEffect } from "react";
import API from "../api";
import TweetItem from "../components/TweetItem";

const Bookmarks = () => {
    const [bookmarkedTweets, setBookmarkedTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ブックマーク一覧を取得
    const fetchBookmarkedTweets = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await API.get("bookmarks/");
            setBookmarkedTweets(res.data);
        } catch (err) {
            console.error("Failed fetch bookmarks", err);
            setError("Failed fetch bookmarks");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBookmarkedTweets();
    }, []);

    return (
        <div className="container mx-auto mt-4 px-4">
            <h2 className="text-2xl font-bold mb-4">Bookmarks</h2>

            {loading && <p>Loading bookmarks...</p>}
            {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

            {!loading && bookmarkedTweets.length === 0 && <p>Bookmarks Not yet.</p>}

            <div className="space-y-4">
                {bookmarkedTweets.map((tweet) => (
                    <TweetItem key={tweet.id} tweet={tweet} />
                ))}
            </div>
        </div>
    );
};

export default Bookmarks;
