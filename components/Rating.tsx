import { FaStar, FaStarHalfStroke } from "react-icons/fa6";

const Rating = ({ number, rating_count }: { number: number, rating_count: number }) => {
  const fixedNumber = parseFloat(number.toFixed(1))
  const afterDecimal = fixedNumber - Math.floor(fixedNumber);
  let halfStar = false;
  if (afterDecimal >= 0.3 && afterDecimal <= 0.7) {
    halfStar = true;
  }
  return (
    <div className="bg-[#76a6e6]/60 flex items-center justify-center gap-2 w-max p-2 rounded-md">
      {new Array(Math.floor(fixedNumber)).fill(0).map((_, i) => (
        <FaStar className="text-yellow-400" key={"star-" + i} />
      ))}
      {halfStar && <FaStarHalfStroke className="text-yellow-400" />}
      {new Array(5 - Math.floor(fixedNumber)).fill(0).map((_, i) => (
        <FaStar className="text-white" key={"star-" + i} />
      ))}

      <p className="text-white text-md">{fixedNumber} <span className="text-xs">({rating_count})</span></p>
    </div>
  );
};

export default Rating;
