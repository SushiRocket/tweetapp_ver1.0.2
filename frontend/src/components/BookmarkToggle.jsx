// frontend/src/components/BookmarkToggle.jsx

import React, { useState, useEffect } from "react";
import API from "../api";

const  BookmarkToggle = ({ tweetId, initialBookmarked, onToggle }) => {
    const [bookmarked, setBookmarked] = useState(initialBookmarked);

    useEffect(() => {
        setBookmarked(initialBookmarked);
    }, [initialBookmarked]);

    const handleBookmark = async () => {
        try {
            const response = await API.post(`tweets/${tweetId}/bookmark/`);
            console.log("Bookmark Response:", response.data)
            setBookmarked(true);
            onToggle(true);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleUnBookmark = async () => {
        try {
            const response = await API.delete(`tweets/${tweetId}/unbookmark/`);
            console.log("UnBookmark Response:", response.data);
            setBookmarked(false);
            onToggle(false);
        } catch (error) {
            console.error("Error unbookmark", error);
        }
    };

    return (
        <div>
            {bookmarked ? (
                <button onClick={handleUnBookmark} className="text-red-500">
                    UnBookmark
                </button>
            ) : (
                <button onClick={handleBookmark} className="text-blue-500">
                    Bookmark
                </button>
            )}
        </div>

    );
};

export default BookmarkToggle;