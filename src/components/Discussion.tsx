import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../redux/store";
import {
  toggleUpvote,
  createComment,
} from "../redux/feature/discussion/discussionSlice";
import Comment from "./Comment";
import AddComment from "./AddComment";
import DiscussionActions from "./DiscussionActions";
import DiscussionHeader from "./DiscussionHeader";
import type { DiscussionType } from "../types/common";

type DiscussionProps = {
  discussion: DiscussionType;
};

const Discussion: React.FC<DiscussionProps> = ({ discussion }) => {
  const { _id, title, content, comments } = discussion;

  const [openComments, setOpenComments] = useState(false);
  const { loading } = useSelector((state: RootState) => state.discussion);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenComments = () => {
    setOpenComments(!openComments);
  };

  const handleUpvote = () => {
    dispatch(toggleUpvote({ discussionId: _id }));
  };

  const handleAddComment = (
    e: React.FormEvent,
    newComment: string,
    setNewComment: React.Dispatch<React.SetStateAction<string>>
  ) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    dispatch(createComment({ discussionId: _id, content: newComment }));
    setNewComment("");
  };

  return (
    <div className="border-2 border-gray-200 rounded-md w-full">
      <DiscussionHeader discussionId={_id} />
      <div className="p-2 border-b border-gray-300/50">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-700">{content}</p>
      </div>
      <div className="w-full h-fit">
        <DiscussionActions
          loading={loading}
          discussionId={_id}
          handleOpenComments={handleOpenComments}
          handleUpvote={handleUpvote}
        />
      </div>
      <div className="w-full h-fit">
        {openComments && (
          <div className="px-3 py-2 border-t border-gray-200 transition-all duration-300">
            <AddComment loading={loading} handleAddComment={handleAddComment} />
            {comments.length > 0 ? (
              comments.map((c) => <Comment key={c._id} comment={c} />)
            ) : (
              <p className="text-gray-500 text-sm italic">No comments yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discussion;
