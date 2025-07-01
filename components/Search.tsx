"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { FaMagnifyingGlass, FaTicket } from "react-icons/fa6";

const Search = () => {
  const [text, setText] = useState("");

  return (
    <div className="flex items-center justify-center gap-6 flex-col py-[50px] px-[10px] bg-gray-200">
      <h1 className="text-3xl font-bold text-primary">Tired of Searching?</h1>
      <p className="">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur,
        ipsa?
      </p>
      <div className="flex items-center justify-center relative w-[400px]">
        <input
          type="text"
          placeholder="Search"
          className="p-2 rounded-full border-2 border-primary outline-0 w-full"
          value={text}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
        />
        <Link href={"/search?q=" + text} className="absolute right-[7px]">
          <FaMagnifyingGlass className="bg-primary w-full h-full p-2 rounded-full text-white" />
        </Link>
      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-4 bg-gray-300 p-2 rounded-md">
          <FaTicket className="text-3xl text-red-600" />
          <div className="flex flex-col items-center justify-start">
            <p className="text-md font-semibold">All Codes</p>
            <span className="text-sm">Verified</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 bg-gray-300 p-2 rounded-md">
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
