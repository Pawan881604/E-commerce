import React from "react";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../../actions/cartAction";

const QunContBtn = ({ item }) => {
  const dispatch = useDispatch();
  //------increase Quantity
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) return;
    dispatch(addItemsToCart(id, newQty));
  };
  //---Decrease Quantity
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;
    dispatch(addItemsToCart(id, newQty));
  };

  return (
    <>
      <div className="qun-cont">
        <button onClick={() => decreaseQuantity(item.link, item.quantity)}>
          -
        </button>
        <input readOnly type="number" value={item.quantity} />
        <button
          onClick={() => increaseQuantity(item.link, item.quantity, item.stock)}
        >
          +
        </button>
      </div>
    </>
  );
};

export default QunContBtn;
