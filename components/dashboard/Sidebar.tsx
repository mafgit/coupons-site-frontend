import { FaHome } from "react-icons/fa";
import { FaBackwardStep, FaShirt, FaTag, FaTicket } from "react-icons/fa6";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <div className="transition-all duration-300 sidebar bg-primary/80 z-50 fixed top-[15vh] rounded-r-[100px] h-[70vh] left-0 w-[60px] flex flex-col gap-8 items-center justify-center py-4 px-1 hover:w-[300px] hover:bg-primary/95 shadow-md shadow-black/30">
      <div className="w-full flex items-center justify-center flex-col gap-2">
        <SidebarItem
          href="/dashboard"
          title="Home"
          Icon={<FaHome className="text-white" />}
        />
      </div>

      <div className="w-full flex items-center justify-center flex-col gap-2">
        <SidebarItem
          href="/dashboard/brands"
          title="Brands"
          Icon={<FaShirt className="text-red-500" />}
        />
        <SidebarItem
          href="/dashboard/coupons"
          title="Coupons"
          Icon={<FaTicket className="text-orange-500" />}
        />
        <SidebarItem
          href="/dashboard/categories"
          title="Categories"
          Icon={<FaTag className="text-blue-500" />}
        />
      </div>

      <div className="w-full flex items-center justify-center flex-col gap-2">
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
