import React from "react";
import { BiUser } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { formatDate } from "../utils/common";
import clock from "../assets/clock.svg";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { DiscussionHeaderProps, DiscussionType } from "../types/common";

const DiscussionHeader: React.FC<DiscussionHeaderProps> = ({
  discussionId,
}) => {
  const discussion = useSelector((state: RootState) =>
    state.discussion.discussions.find(
      (d: DiscussionType) => d._id === discussionId
    )
  );

  if (!discussion) return null;

  return (
    <div className="flex justify-between items-center border-b border-gray-300/50 p-2">
      <div className="flex items-center gap-2">
        <BiUser size={24} />
        <p>{discussion.userId.name}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img src={clock} alt="" className="h-4" />
          <p className="text-sm">{formatDate(discussion.createdAt)}</p>
        </div>
        <BsThreeDots size={20} />
      </div>
    </div>
  );
};

export default DiscussionHeader;
