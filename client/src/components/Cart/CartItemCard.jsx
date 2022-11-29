import React from "react";
import { Link } from "react-router-dom";
import "./cartItemCard.css";

const CartItemCart = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ProductImage" />
      <div>
        <Link to={`product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCart;
