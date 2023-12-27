import React from "react";
import { NavLink } from "react-router-dom";
import { FaHouse, FaAngleRight } from "react-icons/fa6";
import { StarComponent } from "./StarComponent";

const SingleProductRight = ({ item }) => {
  const ratings = item.ratings !== undefined ? item.ratings : 0;

  return (
    <>
      <div className="summary entry-summary">
        <div className="product-navigation">
          <ul>
            <li>
              <NavLink to={"/"}>
                <FaHouse />
              </NavLink>
              <FaAngleRight />
            </li>
            <li>
              <NavLink to={`/category/${item.category}`}>
                {item.category}
              </NavLink>
              <FaAngleRight />
            </li>
            <li>{String(item.name).substr(0, 30)}...</li>
          </ul>
        </div>
        <h1>{item.name}</h1>
        <div className="product_meta">
          <p>
            <span>CATEGORIES:</span>
            <NavLink to={`/category/${item.category}`}>
              <span>{item.category}</span>
            </NavLink>
          </p>
        </div>
        <div className="price">
          <h3>
            <ins>₹{item.price}</ins>
            <del>₹{item.maxprice ? item.maxprice : 0}</del>
          </h3>
        </div>
        <div className="ratings">
          <StarComponent review={ratings} />
          <div className="numOfReviews">
            ( <span>{item.numOfReviews}</span> <span>Reviews</span> )
          </div>
        </div>
        <div className="short-description">
          <div dangerouslySetInnerHTML={{ __html: item.description }} />
        </div>
      </div>
    </>
  );
};

export default SingleProductRight;
