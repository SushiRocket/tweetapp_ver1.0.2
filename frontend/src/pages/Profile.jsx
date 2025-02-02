// frontend/src/pages/Profile.jsx

import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import API, { API_BASE_URL } from "../api";

function Profile() {
    const { user, accessToken, logout } = useContext(AuthContext);
    const [bio, setBio] = useState(user ? user.bio : "");
    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (user) {
            setBio(user.bio);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        try {
            const formData = new FormData();
            formData.append("bio", bio);
            if (profileImage) {
                formData.append("profile_image", profileImage);
            }

            const res = await API.patch("profile/me/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Profile update response:", res);
            // 更新されたユーザー情報をContextに反映
            // ここでは再度プロフィールを取得する方法もあります
            // または、AuthContextにsetUserを追加して直接更新することも可能

            setSuccess("Profile updated successfully!");
        } catch (err) {
            console.error("Profile update failed", err);
            setError("Failed to update profile. Please try again.");
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Your Profile</h2>
                
                {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
                {success && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{success}</div>}
                
                <div className="mb-4 flex flex-col items-center">
                    <img
                        src={user.profile_image ? `${API_BASE_URL}${user.profile_image}` : "/default_profile.png"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover mb-2"
                    />
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700">Bio</label>
                    <textarea
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself"
                        rows="3"
                    ></textarea>
                </div>
                
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Update Profile
                </button>
                
                <button
                    type="button"
                    onClick={logout}
                    className="w-full mt-2 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200"
                >
                    Logout
                </button>
            </form>
        </div>
    );
}

export default Profile;
