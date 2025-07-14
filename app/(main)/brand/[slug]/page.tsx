import Coupon from "@/components/Coupon";
import InteractiveRating from "@/components/InteractiveRating";
import Rating from "@/components/Rating";
import { ICoupon } from "@/types/ICoupon";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight, FaUsers } from "react-icons/fa6";

const BrandPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  try {
    const { brand, your_rating } = await fetch(
      `http://localhost:5000/api/brand/by-slug/${slug}`
    ).then((res) => res.json());
    return (
      <div className="mb-[100px] mt-[20px]">
        <div className="bg-white rounded-2xl w-[95%] mt-[10px] mx-auto">
          <div className="w-full p-4 py-8 gap-6 flex items-center justify-evenly max-w-[1100px] mx-auto bg-white rounded-xl">
            <Image
              src={brand.image}
              width={1000}
              height={1000}
              alt="logo"
              className="w-[150px] h-[150px] rounded-full border-1 border-black/20 object-cover"
            />
            <div className="grow-[4] flex flex-col gap-2">
              <h1 className="text-3xl font-bold">{brand.name}</h1>
              <p className="text-sm font-light">{brand.description}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-white bg-[#76a6e6] p-2 w-full flex items-center justify-center gap-1 rounded-md text-sm">
                <FaUsers /> <span>{brand.view_count}</span>
              </p>
              <Link
                className="text-white bg-[#76a6e6] rounded-md p-2 w-max flex items-center justify-center gap-1 text-sm"
                href={brand.website}
                target="_blank"
              >
                <span>Visit Site</span>
                <FaChevronRight />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-stretch items-stretch max-w-[1100px]  mt-[30px]  mx-auto">
          <div className="flex flex-col gap-2 w-[70%] h-full">
            <h2 className="text-2xl font-semibold mb-2">Coupons</h2>
            {brand.coupons.length ? brand.coupons.map((coupon: ICoupon) => (
              <Coupon
                coupon={coupon}
                key={coupon._id}
                brand_image={brand.image}
              />
            )) : <p className="text-gray-700">No Coupons Yet</p>}
          </div>

          <div className="flex flex-col gap-4 h-full w-full items-end">
            <h2 className="text-lg font-semibold mb-2">
              More About {brand.name}
            </h2>

            <div className="flex flex-col gap-1 items-center justify-center bg-gray-200  p-2 rounded-md">
              <h3 className="text-md text-center w-full">Ratings By Users</h3>
              <Rating
                number={brand.rating ?? 0}
                rating_count={brand.rating_count ?? 0}
              />
            </div>

            <div className="flex flex-col gap-1 items-center justify-center bg-gray-200 p-2 rounded-md">
              <h3 className="text-md text-center w-full">Your Rating</h3>
              <InteractiveRating
                number={your_rating ?? 0}
                brandId={brand._id}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return <>There was an error</>;
  }
};

export default BrandPage;
