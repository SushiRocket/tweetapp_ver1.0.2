// frontend/src/components/CommentItem.jsx

import React, { useState } from "react";
import API from "../api";

const CommentItem = ({tweetId, comment, onUpdate, onDelete }) => {
    const [editing, setEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);

    // コメント編集
    const handleEditSave = async () => {
        try {
            const res = await API.patch(`tweets/${tweetId}/comments/${comment.id}/`, {
                content: editContent,
            });
            onUpdate(res.data);
            setEditing(false);
        } catch (err) {
            console.error("Failed to edit comment:", err);
            alert("Failed to edit comment.");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure that deleting this comment?")) return;
        try {
            await API.delete(`tweets/${tweetId}/comments/${comment.id}/`);
            onDelete(comment.id);
        } catch (err) {
            console.error("Failed to delete comment:", err);
            alert("Failed to delete comment.");
        }
    };

    return (
        <div className="border-b p-2 flex justify-between items-center">
            {editing ? (
                // 編集モード
                <>
                    <textarea
                        className="w-full border"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                    />
                    <div>
                        <button onClick={handleEditSave} className="text-green-500">Save</button>
                        <button onClick={() => setEditing(false)} className="text-gray-500">Cancel</button>
                    </div>
                </>
            ) : (
                // 表示モード
                <>
                    <div>
                        <p>
                            <strong>{comment.user.username}</strong>: {comment.content}
                        </p>
                        <small>{new Date(comment.created_at).toLocaleString()}</small>
                    </div>
                    <div>
                        <button onClick={() => setEditing(true)} className="text-blue-500">Edit</button>
                        <button onClick={handleDelete} className="text-red-500">Delete</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CommentItem;