import React from "react";
import { BiStar } from "react-icons/bi";
import { MdChatBubbleOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleCreateDiscussionModalOpen } from "../redux/feature/modal/modalSlice";

const OptionsBar: React.FC = () => {
  const dispatch = useDispatch();

  const handleOpenNewDiscussion = () => {
    dispatch(toggleCreateDiscussionModalOpen());
  };

  return (
    <div className="w-full space-y-3">
      <div className="w-full">
        <button
          onClick={handleOpenNewDiscussion}
          className="w-full bg-blue-500 hover:bg-blue-600 duration-200 p-2 rounded-md"
        >
          <p className="text-white font-semibold">Start New Discussion</p>
        </button>
      </div>
      <div className="w-full space-y-2">
        <button className="flex gap-2 p-2 justify-start items-center border border-gray-300 hover:bg-gray-100 duration-200 rounded-md w-full">
          <MdChatBubbleOutline size={20} />
          <p>All Discussions</p>
        </button>
        <button className="flex justify-start items-center gap-2 p-2 border border-gray-300 hover:bg-gray-100 duration-200 rounded-md w-full">
          <BiStar size={20} />
          <p>Following</p>
        </button>
      </div>
      <div className="w-full space-y-2">
        {MoreOptions.map((option) => (
          <div
            key={option.id}
            className="bg-gray-100 rounded-md w-full hover:bg-gray-200 duration-200"
          >
            <Link
              to={option.link}
              className="flex justify-start items-center w-full h-full p-2"
            >
              <p className="text-gray-600">{option.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const MoreOptions = [
  {
    id: "001",
    title: "FAQs",
    link: "/faqs",
  },
  {
    id: "002",
    title: "Support",
    link: "/support",
  },
  {
    id: "003",
    title: "Feedback",
    link: "/feedback",
  },
  {
    id: "004",
    title: "Terms of Service",
    link: "/terms",
  },
  {
    id: "005",
    title: "Privacy Policy",
    link: "/privacy",
  },
  {
    id: "006",
    title: "Community Guidelines",
    link: "/community-guidelines",
  },
];

export default OptionsBar;
