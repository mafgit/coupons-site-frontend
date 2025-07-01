import { ICoupon } from "@/types/ICoupon";
import Card from "./Card";
import { FaChevronRight } from "react-icons/fa6";
import Link from "next/link";

const Row = ({ category, cards }: { category: string; cards: ICoupon[] }) => {
  return (
    <div className="flex flex-col gap-4 p-4 px-8 mx-auto w-full max-w-[1200px]">
      <Link
        href={"/category/" + category}
        className="text-xl flex items-center justify-center font-semibold"
      >
        <span>{category}</span>
        <FaChevronRight />
      </Link>
      <div className="flex gap-4 w-full flex-wrap items-center justify-center">
        {cards.map((card) => (
          <Card key={card._id} coupon={card} />
        ))}
      </div>
    </div>
  );
};

export default Row;
