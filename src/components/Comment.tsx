import React from "react";
import { BiUser } from "react-icons/bi";
import type { CommentType } from "../types/common";

type CommentProps = {
  comment: CommentType;
};

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div key={comment._id} className="mb-2 bg-gray-300/50 p-2 rounded-md">
      <div className="flex items-center gap-2 mb-1 border-b border-gray-300 pb-1">
        <BiUser size={18} />
        <p className="text-sm">{comment.userId.name}</p>
      </div>
      <p className="text-gray-800 text-sm">{comment.content}</p>
    </div>
  );
};

export default Comment;
