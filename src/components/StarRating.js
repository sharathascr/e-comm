import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`fullStar+${i}`} />
      ))}
      {halfStar && <FaStarHalfAlt />}
      {[...Array(emptyStars)].map((_, i) => (
        <CiStar key={`emptyStar+${i}`} />
      ))}
    </div>
  );
}

export default StarRating;
