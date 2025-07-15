'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  return (
    <Link
      className="flex sm:gap-3 w-full items-center justify-start text-white p-2 rounded-lg"
      href={href}
    >
      <div className={"text-xl rounded-lg min-w-[35px] h-[35px] flex items-center justify-center "+ (href === pathname ? 'bg-white/90 text-primary' : 'bg-white/30 text-white')}>
        {Icon}
      </div>
      <span className="transition-all duration-400 origin-left scale-x-0 hidden sm:inline-block text-sm">
        {title}
      </span>
    </Link>
  );
};

export default SidebarItem;
