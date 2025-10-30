import React from "react";
import { BiUser } from "react-icons/bi";
import {
  FaCalendarAlt,
  FaPenFancy,
  FaSignOutAlt,
  FaUserFriends,
} from "react-icons/fa";
import { MdEdit, MdOutlineEmail } from "react-icons/md";
import { toggleProfileModal } from "../redux/feature/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { logout } from "../redux/feature/user/userSlice";

const ProfileModal: React.FC = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);

  const handleCloseProfileModal = () => {
    dispatch(toggleProfileModal());
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseProfileModal();
    localStorage.removeItem("token");
    window.location.href = "/auth";
  };

  return (
    <div className="fixed inset-0 h-full w-full flex justify-center items-center backdrop-blur-xs">
      <div className="bg-gray-200 h-[60%] w-[50%] rounded-2xl shadow-lg p-6 flex flex-col gap-6 relative">
        <div className="flex items-center justify-between gap-4 border-b border-gray-300 pb-4">
          <div className="flex gap-2 items-center justify-center">
            <div className="border rounded-full p-2">
              <BiUser size={28} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {user?.name || "Anonymous"}
              </h2>
              <p className="text-gray-600 text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm font-medium">
              <MdEdit className="text-lg" /> Edit
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm font-medium"
            >
              <FaSignOutAlt className="text-lg" /> Logout
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-gray-700">
          <div className="flex items-center gap-3">
            <MdOutlineEmail className="text-gray-600 text-lg" />
            <span>{user?.email || "No email available"}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-gray-600 text-lg" />
            <span>{user?.dob ? user.dob : "DOB not set"}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaUserFriends className="text-gray-600 text-lg" />
            <span>{user?.followers?.length || 0} Followers</span>
          </div>
          <div className="flex items-center gap-3">
            <FaPenFancy className="text-gray-600 text-lg" />
            <span>{user?.discussions?.length || 0} Discussions Created</span>
          </div>
        </div>
        <div className="mt-auto bg-gray-300 rounded-md p-4">
          <p className="text-sm text-gray-700 italic">
            {user?.bio ||
              `"No bio yet. Add something about yourself in Edit Profile."`}
          </p>
        </div>
        <div className="w-full flex justify-end items-center">
          <button
            onClick={handleCloseProfileModal}
            className="bg-blue-500 hover:bg-blue-600 px-5 py-1 text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
