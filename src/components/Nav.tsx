import React from "react";
import SearchBar from "./SearchBar";
import user from "../assets/user.svg";
import mail from "../assets/mail.svg";
import trend from "../assets/trending.svg";
import { useDispatch } from "react-redux";
import { toggleProfileModal } from "../redux/feature/modal/modalSlice";

const Nav: React.FC = () => {
  const dispatch = useDispatch();

  const handleOpenProfileModal = () => {
    dispatch(toggleProfileModal());
  };
  return (
    <div className="flex h-[10vh] justify-between items-center p-3 px-16 border-b border-gray-400/50">
      <div className="flex flex-col justify-center items-end">
        <h1 className="text-3xl font-bold">Talentloom</h1>
        <p className="text-xs font-semibold">Discussion Forum</p>
      </div>
      <div>
        <SearchBar />
      </div>
      <div className="flex gap-8">
        <button>
          <img src={trend} alt="trending" className="h-8" />
        </button>
        <button>
          <img src={mail} alt="mail" className="h-8" />
        </button>
        <button
          onClick={handleOpenProfileModal}
          className="border-2 rounded-full p-1"
        >
          <img src={user} alt="user" className="h-6" />
        </button>
      </div>
    </div>
  );
};

export default Nav;
