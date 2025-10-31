import React, { useState } from "react";
import type { AddCommentProps } from "../types/common";

const AddComment: React.FC<AddCommentProps> = ({
  loading,
  handleAddComment,
}) => {
  const [newComment, setNewComment] = useState("");

  return (
    <form
      onSubmit={(e) => handleAddComment(e, newComment, setNewComment)}
      className="flex gap-2 mb-3"
    >
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition disabled:bg-gray-400"
      >
        {loading ? "..." : "Post"}
      </button>
    </form>
  );
};

export default AddComment;
