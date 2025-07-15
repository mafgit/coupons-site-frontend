"use client";

import useStore from "@/hooks/useStore";
import { FaMagnifyingGlass, FaTicket } from "react-icons/fa6";

const Search = () => {
  const openSearch = useStore((s) => s.openSearch);

  return (
    <div className="flex items-center justify-center gap-6 flex-col py-[50px] px-[10px] bg-[#ebeced] text-center bg-gradient-to-br from-[#ebeced] to-gray-100 border-b-1 border-black/5">
      <h1 className="text-4xl font-bold text-gray-700  max-w-[80%]">Tired of Searching?</h1>
      <p className="text-gray-700 max-w-[80%]">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur,
        ipsa?
      </p>
      <div
        className="flex items-center justify-center relative w-[400px]  max-w-[90%]"
        onClick={() => openSearch()}
      >
        <input
          type="text"
          placeholder="Search"
          className="p-2 rounded-full border-2 border-primary outline-0 w-full bg-gray-100 bg-gradient-to-br from-gray-50 to-gray-200"
        />
        <div className="absolute right-[7px]">
          <FaMagnifyingGlass className="bg-primary w-full h-full p-2 rounded-full text-white" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-4 p-2 rounded-md bg-gradient-to-r from-gray-300 to-gray-200  border-1 border-gray-800/40">
          <FaTicket className="text-3xl text-red-600" />
          <div className="flex flex-col items-center justify-start">
            <p className="text-md font-semibold">All Codes</p>
            <span className="text-sm">Verified</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 p-2 rounded-md bg-gradient-to-r from-gray-200 to-gray-300 border-1 border-gray-800/40">
          <FaTicket className="text-3xl text-orange-600" />
          <div className="flex flex-col items-center justify-start">
            <p className="text-md font-semibold">All Codes</p>
            <span className="text-sm">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
