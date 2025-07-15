import { FaHome } from "react-icons/fa";
import { FaBackwardStep, FaShirt, FaTag, FaTicket, FaUsers } from "react-icons/fa6";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <div className="transition-all duration-300 sidebar bg-primary/80 z-50 fixed bottom-0 left-1/2 -translate-x-1/2 sm:-translate-x-0 w-[410px] h-[60px] sm:top-[15vh] rounded-t-[100px] sm:rounded-none sm:rounded-r-[100px] sm:h-[410px] sm:left-0 sm:w-[60px] flex flex-row sm:flex-col sm:gap-4 items-center justify-center py-4 px-1 sm:hover:w-[300px] sm:hover:bg-primary/95 shadow-md shadow-black/30 sm:hover:rounded-tr-[20px] sm:hover:rounded-br-[20px] sm:hover:p-[16px]">
      <div className="sm:w-full flex items-center justify-center flex-col sm:gap-2">
        <SidebarItem
          href="/dashboard"
          title="Home"
          Icon={<FaHome className="text-white" />}
        />
      </div>

      <div className="sm:w-full flex items-center justify-center flex-row sm:flex-col sm:gap-2">
        <SidebarItem
          href="/dashboard/brands"
          title="Brands"
          Icon={<FaShirt />}
        />
        <SidebarItem
          href="/dashboard/coupons"
          title="Coupons"
          Icon={<FaTicket />}
        />
        <SidebarItem
          href="/dashboard/categories"
          title="Categories"
          Icon={<FaTag />}
        />
        <SidebarItem
          href="/dashboard/users"
          title="Users"
          Icon={<FaUsers />}
        />
      </div>

      <div className="sm:w-full flex items-center justify-center flex-col sm:gap-2">
        <SidebarItem
          href="/"
          title="Website"
          Icon={<FaBackwardStep className="text-white" />}
        />
      </div>
    </div>
  );
};

export default Sidebar;
