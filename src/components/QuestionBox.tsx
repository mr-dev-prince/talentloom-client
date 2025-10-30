import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiscussions } from "../redux/feature/discussion/discussionSlice";
import Questions from "./Questions";
import type { AppDispatch, RootState } from "../redux/store";

const QuestionBox: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { discussions, error } = useSelector(
    (state: RootState) => state.discussion
  );

  console.log("discussions", discussions);

  useEffect(() => {
    dispatch(getDiscussions());
  }, [dispatch]);

  if (error)
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

  if (discussions.length === 0)
    return (
      <div className="text-center text-gray-500 mt-10">
        No discussions yet. Be the first to start one!
      </div>
    );

  return (
    <div className="p-2 h-fit space-y-4 w-full">
      {discussions.map((discussion) => (
        <Questions key={discussion._id} discussion={discussion} />
      ))}
    </div>
  );
};

export default QuestionBox;
