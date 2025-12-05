import { Star, StarHalf, StarOff } from "lucide-react";

const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<Star key={i} fill="currentColor" stroke="none" size={20} />);
    } else if (i - rating <= 0.5) {
      stars.push(<StarHalf key={i} size={20}/>);
    } else {
      stars.push(<StarOff key={i} size={20}/>);
    }
  }

  return <div style={{marginBottom: "10px", color: "#1F2937"}}>{stars}</div>;
};

export default StarRating;
