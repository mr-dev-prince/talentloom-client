import React from "react";
import { BiUpvote } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { DiscussionActionsProps, DiscussionType } from "../types/common";

const DiscussionActions: React.FC<DiscussionActionsProps> = ({
  handleUpvote,
  handleOpenComments,
  loading,
  discussionId,
}) => {
  const discussion = useSelector((state: RootState) =>
    state.discussion.discussions.find(
      (d: DiscussionType) => d._id === discussionId
    )
  );

  if (!discussion) return null;

  return (
    <div className="flex justify-between p-1 px-4">
      <div className="flex gap-4 items-center">
        <button onClick={handleUpvote} disabled={loading}>
          <BiUpvote
            size={20}
            className="hover:text-indigo-600 transition-colors"
          />
        </button>
        <p className="text-sm font-semibold">{discussion.upvotes}</p>
        <button onClick={handleOpenComments}>
          <FaRegComment size={20} />
        </button>
      </div>
      <p className="text-sm">{discussion.comments?.length} Comments</p>
    </div>
  );
};

export default DiscussionActions;
