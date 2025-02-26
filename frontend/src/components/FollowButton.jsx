// frontend/src/components/FollowButton.jsx

import React, { useState, useEffect } from "react";
import API from "../api";

const FollowButton = ({username, isFollowing, onToggle }) => {
    const [following, setFollowing] = useState(isFollowing);

    useEffect(() => {
        setFollowing(isFollowing);
    }, [isFollowing]);

    const handleFollow = async () => {
        try {
            const response = await API.post(`users/${username}/follow/`);
            console.log("Follow Response:", response.data)
            setFollowing(true);
            onToggle(true);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleUnFollow = async () => {
        try {
            const response = await API.delete(`users/${username}/unfollow/`);
            console.log("UnFollow Response:", response.data);
            setFollowing(false);
            onToggle(false);
        } catch (error) {
            console.error("Error unFollow", error);
        }
    };

    return (
        <button
            onClick={following ? handleUnFollow : handleFollow}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ease-in-out 
                ${following 
                    ? "bg-gray-300 text-gray-700 hover:bg-gray-400" 
                    : "bg-blue-500 text-white hover:bg-blue-600 shadow-md"}`}
        >
            {following ? "Following" : "Follow"}
        </button>
    );
};

export default FollowButton;