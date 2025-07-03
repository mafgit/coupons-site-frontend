import Link from "next/link";
import React from "react";

const SidebarItem = ({
  href,
  title,
  Icon,
}: {
  href: string;
  title: string;
  Icon: React.ReactNode;
}) => {
  return (
    <Link
      className="flex gap-3 w-full items-center justify-start text-white p-2 rounded-lg"
      href={href}
    >
      <div className="text-xl bg-white/30 rounded-lg min-w-[35px] h-[35px] flex items-center justify-center">
        {Icon}
      </div>
      <span className="transition-all duration-400 origin-left scale-x-0 text-sm">
        {title}
      </span>
    </Link>
  );
};

export default SidebarItem;
