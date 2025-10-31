import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toggleCreateDiscussionModalOpen } from "../redux/feature/modal/modalSlice";
import { createDiscussion } from "../redux/feature/discussion/discussionSlice";
import type { AppDispatch, RootState } from "../redux/store";

const CreateDiscussionModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { loading } = useSelector((state: RootState) => state.discussion);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState<boolean>(false);

  const handleCloseNewDiscussion = () => {
    dispatch(toggleCreateDiscussionModalOpen());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim())
      return alert("Please fill all fields");

    const discussionData = {
      title,
      content,
      public: isPublic,
    };

    const result = await dispatch(createDiscussion(discussionData));

    if (createDiscussion.fulfilled.match(result)) {
      handleCloseNewDiscussion();
      setTitle("");
      setContent("");
      setIsPublic(false);
    }
  };

  return (
    <div className="fixed inset-0 h-full w-full border flex justify-center items-center backdrop-blur-xs">
      <div className="bg-gray-200 h-[60%] w-[50%] rounded-2xl shadow-lg p-6 flex flex-col gap-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="border p-2 rounded-full">
              <BiUser size={28} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                {user?.name || "Anonymous"}
              </h3>
              <p className="text-sm text-gray-500">
                @{user?.name?.toLowerCase().replace(/\s+/g, "") || "guest"}
              </p>
            </div>
          </div>
          <button
            onClick={handleCloseNewDiscussion}
            className="text-gray-600 hover:text-gray-900 text-xl font-bold"
          >
            ✕
          </button>
        </div>
        <form className="flex flex-col gap-5 flex-1" onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Discussion Title"
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts..."
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 flex-1 resize-none"
          />
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Visibility</span>
            <label className="flex items-center cursor-pointer">
              <span className="mr-2 text-sm text-gray-700">Private</span>
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isPublic}
                onChange={() => setIsPublic(!isPublic)}
              />
              <div className="w-10 h-5 bg-gray-400 rounded-full peer-checked:bg-indigo-500 relative">
                <div
                  className={`absolute top-0.5 ${
                    isPublic ? "right-0.5" : "left-0.5"
                  } w-4 h-4 bg-white duration-200 rounded-full transition-all`}
                ></div>
              </div>
              <span className="ml-2 text-sm text-gray-700">Public</span>
            </label>
          </div>
          <div className="flex justify-end gap-3 mt-auto">
            <button
              onClick={handleCloseNewDiscussion}
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-white transition ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDiscussionModal;
