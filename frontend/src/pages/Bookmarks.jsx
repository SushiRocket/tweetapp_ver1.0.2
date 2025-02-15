// frontend/src/pages/Bookmarks.jsx

import { useState, useEffect } from "react";
import TweetItem from "../components/TweetItem";

const Bookmarks = () => {
  const [bookmarkedTweets, setBookmarkedTweets] = useState([]);

  useEffect(() => {
    fetch("/api/bookmarks/", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setBookmarkedTweets(data))
      .catch((error) => console.error("エラー:", error));
  }, []);

  return (
    <div>
      <h2>ブックマーク一覧</h2>
      {bookmarkedTweets.length > 0 ? (
        bookmarkedTweets.map((tweet) => <TweetItem key={tweet.id} tweet={tweet} />)
      ) : (
        <p>ブックマークがありません</p>
      )}
    </div>
  );
};

export default Bookmarks;
