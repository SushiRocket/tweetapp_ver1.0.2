// frontend/src/pages/MyProfile.jsx

import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import API, {  REACT_APP_HOST_URL,  } from "../api";
import FollowersList from "./FollowersList";
import FollowingList from "./FollowingList";

function Profile() {
  const { user } = useContext(AuthContext); // ログインユーザー情報
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    fetchMyProfile();
  }, []);

  const fetchMyProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.get("profile/me/");
      // res.data: { "id": ..., "bio": "...", "profile_image": "/media/..."}
      setBio(res.data.bio || "");
      // プロフィール画像表示用に setProfileImage には「ファイル」ではなく初期値不要
      // 既存の画像URLはres.data.profile_image
    } catch (err) {
      console.error("Failed to fetch my profile:", err);
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

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
      console.log("Profile update response:", res.data);
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

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const imageUrl = user?.profile_image
    ? user.profile_image.startsWith("http")
      ? user.profile_image
      : `${REACT_APP_HOST_URL}${user.profile_image}`
    : `${REACT_APP_HOST_URL}static/images/default_profile.png`;

  // キャッシュバスター（例: 現在のタイムスタンプ）を付与
  const finalImageUrl = `${imageUrl}?v=${new Date().getTime()}`;


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md h-[600px] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>
        {success && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{success}</div>}
  
        {/* タブボタン */}
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setActiveTab("profile")}
            className={activeTab === "profile" ? "bg-blue-500 text-white px-3 py-1 rounded" : "bg-gray-200 text-gray-700 px-3 py-1 rounded"}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("followers")}
            className={activeTab === "followers" ? "bg-blue-500 text-white px-3 py-1 rounded" : "bg-gray-200 text-gray-700 px-3 py-1 rounded"}
          >
            Followers
          </button>
          <button
            onClick={() => setActiveTab("following")}
            className={activeTab === "following" ? "bg-blue-500 text-white px-3 py-1 rounded" : "bg-gray-200 text-gray-700 px-3 py-1 rounded"}
          >
            Following
          </button>
        </div>
  
        {/* タブの中身 */}
        {activeTab === "profile" && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col items-center">
              <img
                src={finalImageUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700">Bio</label>
              <textarea
                className="w-full px-3 py-2 border rounded"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself"
                rows="3"
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Update Profile
            </button>
          </form>
        )}
  
        {activeTab === "followers" && (
          <div>
            <FollowersList userId={user.id} />
          </div>
        )}
  
        {activeTab === "following" && (
          <div>
            <FollowingList userId={user.id} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;