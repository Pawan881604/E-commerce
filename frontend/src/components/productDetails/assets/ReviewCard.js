import React from "react";
import { StarComponent } from "./StarComponent";

const ReviewCard = ({ review, length }) => {
  return (
    <>
      <div className="review-card">
        <div className="rev-img">
          {/* <img src="/logo512.png" alt="user" /> */}
          <img src={review.image?`http://localhost:8000/${review.image}`:'/icon.png'} alt="user" />
        </div>
        <div className="rev-card-cont">
          <StarComponent review={review.rating} />
          <h4>
            By <span>{review.name}</span>
          </h4>
          <p>{review.comment}</p>
          <p>{review.createdate}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
