import React, { useState } from "react";
import clock from "../assets/clock.svg";
import { BsThreeDots } from "react-icons/bs";
import { BiUpvote, BiUser } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../redux/store";
import {
  toggleUpvote,
  createComment,
  getDiscussions,
} from "../redux/feature/discussion/discussionSlice";

type userId = {
  _id: string;
  name: string;
  email: string;
};

type Comment = {
  _id: string;
  userId: userId;
  content: string;
};

type QuestionsType = {
  _id: string;
  userId: userId;
  title: string;
  content: string;
  upvotes: number;
  comments: Comment[];
  createdAt?: Date;
};

type DiscussionProps = {
  discussion: QuestionsType;
};

const Questions: React.FC<DiscussionProps> = ({ discussion }) => {
  const { _id, userId, title, content, upvotes, comments, createdAt } =
    discussion;

  const [openComments, setOpenComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.discussion);

  const handleOpenComments = () => {
    setOpenComments(!openComments);
  };

  const handleUpvote = () => {
    dispatch(toggleUpvote({ discussionId: _id }));
    dispatch(getDiscussions());
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    dispatch(createComment({ discussionId: _id, content: newComment }));
    dispatch(getDiscussions());
    setNewComment("");
  };

  const formatDate = (date?: Date) => {
    if (!date) return "recently";
    const d = new Date(date);
    return d.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="border-2 border-gray-200 rounded-md w-full">
      <div className="flex justify-between items-center border-b border-gray-300/50 p-2">
        <div className="flex justify-center items-center gap-2">
          <BiUser size={24} />
          <p>{userId.name}</p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="flex justify-center items-center gap-2">
            <img src={clock} alt="" className="h-4" />
            <p className="text-sm">{formatDate(createdAt)}</p>
          </div>
          <div>
            <BsThreeDots size={20} />
          </div>
        </div>
      </div>
      <div className="p-2 border-b border-gray-300/50">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-700">{content}</p>
      </div>
      <div className="flex justify-between p-1 px-4">
        <div className="flex gap-4 justify-center items-center">
          <div className="flex justify-center items-center gap-2">
            <button onClick={handleUpvote} disabled={loading}>
              <BiUpvote
                size={20}
                className="hover:text-indigo-600 transition-colors"
              />
            </button>
            <p className="text-sm font-semibold">{upvotes}</p>
          </div>
          <button onClick={handleOpenComments}>
            <FaRegComment size={20} />
          </button>
        </div>
        <div>
          <button onClick={handleOpenComments}>
            <p className="text-sm">{comments?.length} Comments</p>
          </button>
        </div>
      </div>
      {openComments && (
        <div className="px-3 py-2 border-t border-gray-200 transition-all duration-300">
          <form onSubmit={handleAddComment} className="flex gap-2 mb-3">
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

          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c._id} className="mb-2 bg-gray-100 p-2 rounded-md">
                <div className="flex items-center gap-2 mb-1 border-b border-gray-300 pb-1">
                  <BiUser size={18} />
                  <p className="font-semibold text-sm">{c.userId.name}</p>
                </div>
                <p className="text-gray-800 text-sm">{c.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm italic">No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Questions;
