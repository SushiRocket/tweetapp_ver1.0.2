// frontend/src/components/UserItem.jsx

import React from "react";
import FollowButton from "./FollowButton";

const UserItem = ({ user }) => {

    return (
        <div className="flex items-center justify-between p-4 mb-2 bg-white rounded shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3">
                <span className="font-medium">{user.username}</span>
            </div>
            <FollowButton
                userId={user.id}
                isFollowing={user.isFollowing}
                onToggle={() => {}}
            />
        </div>
    );
};

export default UserItem;