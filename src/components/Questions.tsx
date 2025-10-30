import React, { useState } from "react";
import clock from "../assets/clock.svg";
import { BsThreeDots } from "react-icons/bs";
import { BiUpvote, BiUser } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";

type Comment = {
  _id: string;
  user: string;
  content: string;
};

type QuestionsType = {
  _id?: string;
  user: string;
  title: string;
  content: string;
  upvotes: number;
  comments: Comment[];
  createdAt?: Date;
};

const Questions: React.FC<QuestionsType> = ({
  //   _id,
  user,
  title,
  content,
  upvotes,
  comments,
  //   createdAt,
}) => {
  const [openComments, setOpenComments] = useState(false);

  const handleOpenComments = () => {
    setOpenComments(!openComments);
  };
  return (
    <div className="border-2 border-gray-200 rounded-md w-full">
      <div className="flex justify-between items-center border-b border-gray-300/50 p-2">
        <div className="flex justify-center items-center gap-2">
          <BiUser size={24} />
          <p>{user}</p>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="flex justify-center items-center gap-2">
            <img src={clock} alt="" className="h-4" />
            <p className="text-sm">2 days</p>
          </div>
          <div>
            <BsThreeDots size={20} />
          </div>
        </div>
      </div>
      <div className="p-2 border-b border-gray-300/50">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div>{content}</div>
      </div>
      <div className="flex justify-between p-1 px-4">
        <div className="flex gap-4 justify-center items-center">
          <div className="flex justify-ceter items-center gap-2">
            <button>
              <BiUpvote size={20} />
            </button>
            <p className="text-sm font-semibold">{upvotes}</p>
          </div>
          <button onClick={handleOpenComments}>
            <FaRegComment size={20} />
          </button>
        </div>
        <div>
          <button onClick={handleOpenComments}>
            <p>{comments?.length} Comments</p>
          </button>
        </div>
      </div>
      <div className="px-2 py-1">
        {openComments && (
          <div className="transition-all duration-300">
            {comments.map((c) => (
              <div key={c._id} className=" mb-2 bg-gray-200 p-1 rounded-md">
                <div className="flex items-center gap-2 mb-1 border-b border-gray-400/50">
                  <BiUser size={20} />
                  <p className="font-semibold">{c.user}</p>
                </div>
                <div>{c.content}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
