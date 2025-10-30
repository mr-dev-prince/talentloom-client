import React from "react";
import search from "../assets/search.svg";

const SearchBar: React.FC = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <input
        type="text"
        placeholder="Search Questions"
        className="border border-gray-300 w-[600px] p-2 rounded-l-full indent-2"
      />
      <button className="border border-gray-300 rounded-r-full p-1">
        <img src={search} alt="search" className="h-8" />
      </button>
    </div>
  );
};

export default SearchBar;
