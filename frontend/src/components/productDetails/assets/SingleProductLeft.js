import React from "react";
import "../style/singleproductleft.css";
import LazyLoadImages from "../../layout/lazyload/LazyLoadImages";

const SingleProductLeft = ({ item, imgSlideFun }) => {
  return (
    <>
      <ul>
        {item.imageId &&
          item.imageId.map((item, i) => (
            <li key={i} onClick={() => imgSlideFun(i)}>
         
              <LazyLoadImages product={item}/>
            </li>
          ))}
      </ul>
    </>
  );
};

export default SingleProductLeft;
