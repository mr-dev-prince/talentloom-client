import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiscussions } from "../redux/feature/discussion/discussionSlice";
import Questions from "./Discussion";
import type { AppDispatch, RootState } from "../redux/store";
import type { DiscussionType } from "../types/common";
import SortBy from "./SortBy";

const DiscussionBox: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { discussions, error } = useSelector(
    (state: RootState) => state.discussion
  );

  useEffect(() => {
    dispatch(getDiscussions());
  }, [dispatch]);

  if (error)
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

  if (discussions.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No discussions yet. Be the first to start one!
      </div>
    );
  }

  return (
    <div className="p-2 h-fit w-full">
      <div className="py-1 rounded-sm">
        <SortBy />
      </div>
      <div className="space-y-2 mt-2">
        {discussions.map((discussion: DiscussionType) => (
          <Questions key={discussion._id} discussion={discussion} />
        ))}
      </div>
    </div>
  );
};

export default DiscussionBox;
