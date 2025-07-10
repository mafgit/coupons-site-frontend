"use client";
import { useEffect, useState } from "react";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";

const InteractiveRating = ({
  number,
  brandId,
}: {
  number: number;
  brandId: string;
}) => {
  const [yourRating, setYourRating] = useState(parseFloat(number.toFixed(1)));

  useEffect(() => {
    if (yourRating > 0) {
      fetch("http://localhost:5000/api/brand/rate/" + brandId, {
        method: "POST",
        body: JSON.stringify({ rating: yourRating }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  }, [yourRating]);

  return (
    <div className="bg-gray-500 flex items-center justify-center gap-2 w-max p-2 rounded-full">
      {new Array(Math.floor(5)).fill(0).map((_, i) =>
        i + 1 <= yourRating ? (
          <FaStar
            className="hover:scale-125 duration-100 transition-all text-yellow-400 cursor-pointer"
            onClick={() => {
              setYourRating(i + 1);
            }}
            key={"star-" + i}
          />
        ) : (
          <FaStar
            className="hover:scale-125 duration-100 transition-all text-white cursor-pointer"
            onClick={() => {
              setYourRating(i + 1);
            }}
            key={"star-" + i}
          />
        )
      )}
    </div>
  );
};

export default InteractiveRating;
