import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/OrderSuccess.css";

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(`http://localhost:8080/orders/${id}`);
      if (!res.ok) return;

      const data = await res.json();

      if (!data.total) {
        data.total = data.items.reduce((sum, item) => {
          return sum + item.price * item.qty;
        }, 0);
      }


      setOrder(data);
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return (
      <div className="order-loading">
        <h2>Loading your order...</h2>
      </div>
    );
  }

  return (
    <div className="order-success-container">
      <div className="order-card">
        <h2 className="order-title">🎉 Order Confirmed!</h2>
        <p className="order-subtitle">Thank you for shopping with us.</p>

        <div className="order-info">

          <p><strong>Order ID:</strong> #{order.id}</p>

          <p>
            <strong>Date:</strong>{" "}
            {order.createdAt
              ? new Date(order.createdAt).toLocaleString()
              : "N/A"}
          </p>

          <p>
            <strong>Total:</strong>{" "}
            ₦{order.total ? order.total.toLocaleString() : "0"}
          </p>
        </div>

        <h3 className="order-items-title">Your Items</h3>

        <div className="order-items-list">
          {order.items?.length > 0 ? (
            order.items.map((item) => (
              <div key={item.id} className="order-item">
                <div className="order-item-details">
                  <p className="item-name">{item.name}</p>
                  <p>Qty: {item.qty}</p>
                </div>
                <p className="item-price">
                  ₦{item.price?.toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>No items found.</p>
          )}
        </div>

        <Link to="/" className="order-home-btn">Return to Home</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
