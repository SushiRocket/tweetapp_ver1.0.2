import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import API from "../api";
import TweetForm from "../components/TweetForm";
import TweetItem from "../components/TweetItem";

function TweetList() {
    const { accessToken } = useContext(AuthContext);
    const [tweets, setTweets] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log("Access token:", accessToken);

    // ツイート一覧を取得
    const fetchTweets = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await API.get("tweets/");
            setTweets(res.data);
        } catch (err) {
            console.error("Failed  to fetch tweets", err);
            setError("Failed to load tweets.Please try again.")
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTweets();
    }, []);

    const handleNewTweet = (newTweet) => {
        setTweets([newTweet, ...tweets]);
    };

    // ツイート削除時のハンドラー
    const handleDeleteTweet = (deletedTweetId) => {
        setTweets(tweets.filter(tweet => tweet.id !== deletedTweetId))
    };

    return (
        <div className="container mx-auto mt-4 px-4">
            <h2 className="text-2xl font-bold mb-4">Tweets</h2>

            {accessToken && (
                <div className="mb-6">
                    <TweetForm onTweetCreated={handleNewTweet} />
                </div>
            )}

            {loading && <p>Loading tweets...</p>}
            {error &&  <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

            {!loading && tweets.length === 0 && <p>No tweets available.</p>}

            <div className="space-y-4">
                {tweets.map((tweet) => (
                    <TweetItem key={tweet.id} tweet={tweet} onDelete={handleDeleteTweet}/>
                ))}
            </div>
        </div>
    );
}

export default TweetList;