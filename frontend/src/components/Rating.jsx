import React from "react";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";

const Rating = ({ value, num }) => {
  return (
    <span className="rating">
      <span>
        {value >= 1 ? <FaStar /> : value >= 0.5 && <FaStarHalfStroke />}
      </span>
      <span>
        {value >= 2 ? <FaStar /> : value >= 1.5 && <FaStarHalfStroke />}
      </span>
      <span>
        {value >= 3 ? <FaStar /> : value >= 2.5 && <FaStarHalfStroke />}
      </span>
      <span>
        {value >= 4 ? <FaStar /> : value >= 3.5 && <FaStarHalfStroke />}
      </span>
      <span>
        {value >= 5 ? <FaStar /> : value >= 4.5 && <FaStarHalfStroke />}
      </span>

      <span> ({num && num})</span>
    </span>
  );
};

export default Rating;
