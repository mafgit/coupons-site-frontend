import { ICoupon } from "@/types/ICoupon";
import Image from "next/image";
import Link from "next/link";
import { FaBookmark } from "react-icons/fa6";

const Card = ({ coupon }: { coupon: ICoupon }) => {
  return (
    <div className="card relative rounded-xl flex flex-col items-center justify-between shadow-lg shadow-black/20 bg-white w-[240px]  border-1 border-black/20 h-[310px]">
      <button className="bookmark opacity-0 pointer-events-none duration-300 transition-all absolute top-2 right-2 text-black/20 text-lg">
        <FaBookmark />
      </button>
      <Image
        src={coupon.brand.image}
        alt="logo"
        width={1000}
        height={145}
        className="rounded-t-xl w-full min-h-[135px] max-h-[145px] h-max object-cover bg-white border-b-1 border-black/20"
      />
      <div className="flex flex-col p-3 gap-2 w-full h-max ">
        <div className="flex items-center justify-between">
          <p className="text-sm">{coupon.brand.name}</p>
          <span className="bg-[#C0DEF1] p-1 rounded-xl text-xs">VERIFIED</span>
        </div>
        <h3 className="font-semibold">{coupon.title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-xs">View Terms</p>
          <p className="text-xs">12.1K Used</p>
        </div>
        <Link href={`/brand/${coupon.brand.slug}`} className="reveal-btn relative w-full rounded-xl text-white h-[40px] text-center">
          <span className="bg-primary w-[90%] z-10 transition-all duration-200 h-full rounded-xl absolute top-0 left-0"></span>
          <span className="absolute top-0 left-0 h-full z-[15] w-full flex items-center justify-center">Reveal Code</span>
          <span className="absolute top-0 left-0 z-[5] text-black w-full h-full border-dashed border-2 border-primary rounded-xl flex items-center justify-center">{'xxxxxxxxxxxxxxxxxx' + coupon.code.slice(coupon.code.length - 4)}</span>
        </Link>
      </div>
    </div>
  );
};

export default Card;
