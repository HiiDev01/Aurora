import React from "react";
import "../styles/Cart.css";
import { useCart } from "../context/CartContext";
import Checkout from "../component/Checkout "
import { Archive } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();

  const getPrice = (price) => {
    if (typeof price === "object" && price !== null) return price.amount || 0;
    return Number(price) || 0;
  };

  const total = cart.reduce((sum, item) => sum + getPrice(item.price) * item.qty, 0);

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Shopping Cart</h1>
      {cart.length === 0 && (
        <div style={{textAlign: "center"}}>
          <p>No items in cart.</p>
          <a href="/product">continue shopping</a>
        </div>
      )}

      <div className="cart-layout">
        <div className="cart-items-container">
          {cart.map((item, i) => (
            <div className="cart-List cartItem" key={item.id || i}>
              <div className="cartleft cartBox">
                <div className="cart-image">
                  <img src={item.image} alt="" />
                </div>
                <div className="cartDet">
                  <h3 className="cart-item-name">
                    {item.title && (item.title.length > 30 
                      ? item.title.slice(0, 30) + "..." 
                      : item.title)}
                  </h3>
                  <p className="cart-item-price">${getPrice(item.price)}</p>
                </div>
              </div>

              <div className="cartright cartBox">
                <div className="quantity-control">
                  <button className="qty-btn" onClick={() => decreaseQty(item.id)}>−</button>
                  <span>{item.qty}</span>
                  <button className="qty-btn" onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <p className="cart-item-total">
                  ${getPrice(item.price) * item.qty}
                </p>

                <button className="delete-btn" onClick={() => removeFromCart(item.id)}><Archive size={25}/></button>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${total}</span>
          </div>
          <div className="summary-row total-row">
            <strong>Total:</strong>
            <strong className="total-amount">${total}</strong>
          </div>

          <Checkout />
        </div>
      </div>
    </div>
  );
}
