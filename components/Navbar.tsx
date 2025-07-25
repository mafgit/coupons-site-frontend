"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { FaChevronDown, FaMagnifyingGlass } from "react-icons/fa6";
import useStore from "@/hooks/useStore";
import { ICategory } from "@/types/ICategory";
import ProfilePic from "./ProfilePic";

const Navbar = () => {
  const [text, setText] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const openSearch = useStore((s) => s.openSearch);
  const role = useStore((state) => state.role);

  useEffect(() => {
    fetch("http://localhost:5000/api/category/all")
      .then((res) => res.json())
      .then(({ categories }) => {
        setCategories(categories);
      });
  }, []);

  const authenticated = useStore((state) => state.authenticated);
  return (
    <div className="flex flex-col fixed left-0 top-0 z-40 w-full">
      <div className="flex px-8 items-center justify-between w-full bg-background border-b-1 border-primary/40 min-h-[55px]">
        <Link href="/">
          <Image src="/next.svg" alt="logo" className="w-[65px] sm:w-[80px]" width={100} height={100} />
        </Link>

        <nav className="flex items-center justify-center gap-3 sm:gap-6 text-sm">
          {/* <Link
            href="/"
            className="flex gap-1 items-center justify-center h-full"
          >
            <span>Home</span>
          </Link> */}

          <button className="categories-hover-btn flex gap-1 items-center justify-center min-h-full self-stretch">
            <span>Categories</span>
            <FaChevronDown className="text-xs" />
          </button>

          <div className=" rounded-b-lg fixed top-[54px] w-full flex-wrap min-h-[15vh] left-0 categories-hover-div opacity-0 pointer-events-none flex gap-8 items-center justify-center p-4 bg-gradient-to-r from-background/80 to-background/80">
            <h1 className="text-xl font-semibold text-gray-700">Categories</h1>
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {categories.map((category) => (
                <Link
                  href={`/category/${category.name}`}
                  key={category._id}
                  className="bg-primary text-white px-2 py-1 rounded-lg"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div
            className="flex items-center justify-center relative my-2 cursor-pointer"
            onClick={() => openSearch()}
          >
            <input
              type="text"
              placeholder="Search"
              className="p-2 rounded-full border-1 border-primary outline-0 hidden sm:block"
              value={text}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setText(e.target.value)
              }
            />
            <div className="sm:absolute right-[7px] w-[30px] h-[30px]">
              <FaMagnifyingGlass className="bg-primary w-full h-full p-2 rounded-full text-white" />
            </div>
          </div>

          <ProfilePic image={""} authenticated={authenticated} role={role} />
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
