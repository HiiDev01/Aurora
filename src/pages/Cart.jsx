// ShoppingCart.jsx
import React from "react";
import "../styles/Cart.css";
import { useCart } from "../context/CartContext";
import Checkout from "../component/Checkout ";

export default function ShoppingCart() {
  const { cart, removeFromCart,increaseQty, decreaseQty, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);


  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Shopping Cart</h1>
      {cart.length === 0 && <p>No items in cart.</p>}
      <div className="cart-layout">
        {/* Cart Item */}
       
        <div className="cart-items-container">

          {cart.map((item) => (
            <div className="cart-List cartItem" key={item.id}>
              
              <div className="cartleft cartBox">
                <div className="cart-image">{item.name}</div>
                <div className="cartDet">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">${item.price}</p>
                </div>
              </div>

              <div className="cartright cartBox">
                
                <div className="quantity-control">
                  <button className="qty-btn" onClick={() => decreaseQty(item.id)}>−</button>
                  <span>{item.qty}</span>
                  <button className="qty-btn" onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <p className="cart-item-total">${item.price * item.qty}</p>

                <button className="delete-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
              </div>

            </div>
          ))}

        </div>
     

        {/* Order Summary */}
        <div className="order-summary cartItem">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span> ${total}</span>
          </div>
          <div className="summary-row total-row">
            <strong>Total:</strong>
            <strong className="total-amount">${total}</strong>
          </div>

          <Checkout/>
        </div>
      </div>
    </div>
  );
}


