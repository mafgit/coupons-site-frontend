"use client";
import { ICoupon } from "@/types/ICoupon";
import { useEffect, useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import SearchOffer from "./SearchOffer";
import { IBrand } from "@/types/IBrand";
import SearchBrand from "./SearchBrand";
import useStore from "@/hooks/useStore";

const Search = () => {
  const [text, setText] = useState("");
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [offers, setOffers] = useState<ICoupon[]>([]);
  const timeout = useRef<null | NodeJS.Timeout>(null);
  const [loading, setLoading] = useState(false);
  const openSearch = useStore((s) => s.openSearch);
  const closeSearch = useStore((s) => s.closeSearch);
  const searchOpened = useStore((s) => s.searchOpened);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }

    timeout.current = setTimeout(() => {
      setLoading(true);
      fetch("http://localhost:5000/api/coupon/search?q=" + text)
        .then((res) => res.json())
        .then(({ offers, brands }) => {
          setOffers(offers);
          setBrands(brands);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }, 500);
  }, [text]);

  return (
    <div
      className={
        "search-component fixed top-0 left-0 py-[50px] w-screen h-screen overflow-y-auto bg-white z-[100] transition-all duration-300 ease-in-out " +
        (searchOpened ? "opacity-100" : "opacity-0 pointer-events-none")
      }
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeSearch();
        }
      }}
    >
      {/* <div className=" h-[120vh] min-h-[120vh] max-h-[120vh]  overflow-y-scroll"> */}
      <div className="max-w-[1000px] flex flex-col gap-6 mx-auto">
        <div className="relative border-b-2 border-primary">
          <input
            onClick={() => {
              openSearch();
            }}
            className="w-full p-2 outline-none"
            type="text"
            placeholder="Search"
            name=""
            id=""
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button className="absolute top-1/2 right-[20px] text-gray-400 text-lg -translate-y-1/2" onClick={() => closeSearch()}>
            <FaXmark />
          </button>
        </div>
        <div className="flex gap-2">
          <div className="w-full flex flex-col items-start justify-start basis-[70%] gap-2">
            <h2 className="text-sm font-bold">TRENDING OFFERS</h2>
            <div className="flex flex-col gap-4">
              {loading ? (
                <div>
                  <div className="animate-spin border-l-2 border-r-2 border-primary w-8 h-8 rounded-full"></div>
                </div>
              ) : offers.length > 0 ? (
                offers.map((offer) => (
                  <SearchOffer offer={offer} key={offer._id} />
                ))
              ) : (
                <p>No offers found</p>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start basis-[30%] gap-2">
            <h2 className="text-sm font-bold">BRANDS</h2>
            <div className="flex flex-col gap-4">
              {loading ? (
                <div>
                  <div className="animate-spin border-l-2 border-r-2 border-primary w-8 h-8 rounded-full"></div>
                </div>
              ) : brands.length > 0 ? (
                brands.map((brand) => (
                  <SearchBrand brand={brand} key={brand._id} />
                ))
              ) : (
                <p>No brands found</p>
              )}
            </div>
          </div>
        </div>
        <button className="p-2 w-full bg-primary rounded-md text-white text-sm">
          View All
        </button>
      </div>
    </div>
    // </div>
  );
};

export default Search;
