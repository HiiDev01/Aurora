import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      toast.error("you need to login to checkout")
      return;   // VERY IMPORTANT!
    }
    const orderData = {
      userId: user.id,       // user from context
      items: cart,           // all cart items
      total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      createdAt: new Date(),
    };

    try {
      const response = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const result = await response.json();

      // Clear cart after success
      clearCart();

      // Redirect to order success page
      navigate(`/order-success/${result.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleCheckout}>Confirm Checkout</button>
    </div>
  );
};

export default Checkout;
