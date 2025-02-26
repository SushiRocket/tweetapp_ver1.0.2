// frontend/src/pages/UserProfile.jsx

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FollowButton from "../components/FollowButton";
import API, { REACT_APP_HOST_URL} from "../api";
import FollowersList from "./FollowersList";
import FollowingList from "./FollowingList";

function UserProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const fetchUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get(`users/${username}/profile/`);
      console.log("🚀 API Response:", res.data);
      setProfile(res.data);
      setIsFollowing(res.data.is_following);
      // res.dataの例: { "id": 1, "bio": "...", "profile_image": "/media/..." }
    } catch (err) {
      console.error("Failed to load user profile:", err);
      setError("Failed to load user profile.");
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    if (!username) return;
    fetchUserProfile();
  }, [username, fetchUserProfile]);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };


  if (loading) return <p>Loading user profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile || !profile.id) return <p>No profile found.</p>;


  console.log("profile:", profile);
  console.log("profile.id:", profile.id);

  const imageUrl = profile?.profile_image
    ? profile.profile_image.startsWith("http")
      ? profile.profile_image
      : `${REACT_APP_HOST_URL}${profile.profile_image}`
    : `${REACT_APP_HOST_URL}static/images/default_profile.png`;

  // キャッシュバスター（例: 現在のタイムスタンプ）を付与
  const finalImageUrl = `${imageUrl}?v=${new Date().getTime()}`;
  

  // ここで profile.user.username があるかどうかは
  // バックエンドのProfileSerializerによりけり
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow mt-4">
      <h2 className="text-2xl mb-4">{username}'s Profile</h2>

      {/* ProfileタブかFollowersタブかFollowingタブを切り替えるボタンを配置 */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-3 py-1 rounded
            ${activeTab === "profile" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("followers")}
          className={`px-3 py-1 rounded
            ${activeTab === "followers" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Followers
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className={`px-3 py-1 rounded
            ${activeTab === "following" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
          Following
        </button>
      </div>

      {/* タブごとの表示内容を切り替え */}
      {activeTab === "profile" && (
        <div className="flex flex-col items-center">
          <img 
            src={finalImageUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-2"
          />
        <p className="text-gray-700">{profile.bio}</p>
        
        {profile?.id && (
          <div>
            <Link to={`/dm/${profile.username}`} className="text-blue-500 hover:underline mb-4 inline-block">
              Send DM
            </Link>
            <FollowButton
              userId={profile.id}
              username={profile.username}
              isFollowing={isFollowing}
              onToggle={handleFollowToggle}
            />
          </div>      
        )}
        </div>
      )}

      {activeTab === "followers" && (
        <div>
          <FollowersList userId={profile.id} />
        </div>
      )}

      {activeTab === "following" && (
        <div>
          <FollowingList userId={profile.id} />
        </div>
      )}
    </div>
  );
}

export default UserProfile;
