import React from "react";

const SortBy: React.FC = () => {
  return (
    <div className="w-full flex justify-start items-center">
      <select name="" id="" className="border border-gray-300 p-1 rounded-sm ">
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="most_commented">Most Upvoted</option>
      </select>
      <div className="h-px w-full bg-gray-300" />
    </div>
  );
};

export default SortBy;
