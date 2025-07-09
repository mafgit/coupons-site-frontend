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
  // const categories = useStore((state) => state.categories);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const openSearch = useStore((s) => s.openSearch);
  
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
      <div className="flex px-8 items-center justify-between w-full bg-background border-b-1 border-primary">
        <Image src="/next.svg" alt="logo" width={100} height={100} />

        <nav className="flex items-center justify-center gap-6 text-sm">
          <Link
            href="/"
            className="flex gap-1 items-center justify-center h-full"
          >
            <span>Home</span>
            {/* <FaChevronDown className="text-xs" /> */}
          </Link>

          <button className="categories-hover-btn flex gap-1 items-center justify-center min-h-full self-stretch">
            <span>Categories</span>
            <FaChevronDown className="text-xs" />
          </button>

          <div className="fixed top-[54px] w-full flex-col min-h-[40vh] left-0 categories-hover-div opacity-0 pointer-events-none flex gap-4 items-center justify-center p-4 bg-gradient-to-r from-black/60 to-black/70">
            <h1 className="text-2xl font-semibold text-white">Categories</h1>
            <div className="flex flex-wrap gap-4">
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

          <div className="flex items-center justify-center relative my-2">
            <input
              type="text"
              placeholder="Search"
              onClick={() => openSearch()}
              className="p-2 rounded-full border-1 border-primary outline-0"
              value={text}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setText(e.target.value)
              }
            />
            <Link href={"/search?q=" + text} className="absolute right-[7px]">
              <FaMagnifyingGlass className="bg-primary w-full h-full p-2 rounded-full text-white" />
            </Link>
          </div>

          <ProfilePic image={""} authenticated={authenticated} />
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
