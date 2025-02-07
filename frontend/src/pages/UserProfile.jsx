// frontend/src/pages/UserProfile.jsx

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function UserProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get(`users/${username}/profile/`);
      setProfile(res.data);
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


  if (loading) return <p>Loading user profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p>No profile found.</p>;

  // ここで profile.user.username があるかどうかは
  // バックエンドのProfileSerializerによりけり
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow mt-4">
      <h2 className="text-2xl mb-4">{username}'s Profile</h2>
      <div className="flex flex-col items-center">
        <img
          src={profile.profile_image ? profile.profile_image : "/default_profile.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mb-2"
        />
        <p className="text-gray-700">{profile.bio}</p>
      </div>
      {/* 他にユーザー名やフォロー情報を表示したければ追加 */}
    </div>
  );
}

export default UserProfile;
