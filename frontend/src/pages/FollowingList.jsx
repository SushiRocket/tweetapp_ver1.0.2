// frontend/src/pages/FollowingList.jsx

import React, { useState, useEffect} from "react";
import API from "../api";
import UserItem from "../components/UserItem";

const FollowingList = ({ userId }) => {
    const [followingList, setFollowingList] = useState([]);

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const response = await API.get(`users/${userId}/following/`);
                setFollowingList(response.data);
            } catch (error) {
                console.error("Error fetching following:", error);
            }
        };

        fetchFollowing();
    }, [userId]);

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4">Following</h2>
            {followingList.length > 0 ? (
                followingList.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))
            ) : (
                <p className="text-gray-600">Not following anyone yet</p>
            )}
        </div>
    );
};

export default FollowingList;
