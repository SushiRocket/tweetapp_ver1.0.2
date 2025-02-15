// frontend/src/components/BookmarkToggle.jsx

import { useState, useEffect } from "react";

const  BookmarkToggle = ({ tweetId, isBookmarked, onToggle }) => {
    const [bookmarked, setBookmarked] = useState(isBookmarked);

    useEffect(() => {
        setBookmarked(isBookmarked);
    }, [isBookmarked]);

    const handleBookmark = async () => {
        try {
            const response = await post(`tweets/${tweetId}/bookmark/`)
            console.log("Successful Bookmarked.", response.data)
            setBookmarked(true);

            if (onToggle) onToggle();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <button onClick={handleBookmark} className="bookmark-button">
            {bookmarked ? "Bookmark" : "UnBookmark"}
        </button>
    );
};

export default BookmarkToggle;