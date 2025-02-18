// frontend/src/components/FollowersList.jsx

import React, { useState, useEffect } from "react";
import API from "../api";
import UserItem from "../components/UserItem";

const FollowersList = ({userId}) => {
    const [followers, setFollowers] = useState([]);

    useEffect(()=> {
        const fetchFollowers = async () => {
            try {
                const response = await API.get(`users/${userId}/followers/`);
                setFollowers(response.data);
            } catch (error) {
                console.error("Error fetching followers:", error);
            }
        };

        fetchFollowers();
    }, [userId]);

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4">Followers</h2>
            {followers.length > 0 ? (
                followers.map((follower) => (
                    <UserItem key={follower.id} user={follower} />
                ))
            ): (
                <p className="text-gray-600">No followers yet</p>
            )}
        </div>
    );
};

export default FollowersList;