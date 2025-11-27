import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Loader, Package, ArrowRight } from "lucide-react";
import "../styles/OrderHistory.css";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth(); //getting user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const res = await fetch(`http://localhost:8080/orders?userId=${user.id}`);
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="order-history-loading">
        <Loader size={32} className="spin" />
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="order-history-container">
      <h1>Your Order History</h1>

      {orders.length === 0 ? (
        <p className="no-orders">You have no orders yet.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <Package size={22} />
                <h3>Order #{order.id}</h3>
              </div>

              <p><strong>Date:</strong> {order.createdAt}</p>
              <p><strong>Total:</strong> ₦{order.total ? order.total.toLocaleString() : "0"}</p>
              <p>
                <strong>Status:</strong>
                <span className={`status ${order.status || "pending"}`}>
                  {order.status || "pending"}
                </span>
              </p>


              <div className="order-products">
                <h4>Items:</h4>
                {order.items?.map((item) => (
                  <div className="order-item" key={item.id}>
                    <img src={item.thumbnail} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <p>Qty: {item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to={`/orders/${order.id}`} className="view-btn">
                View Details <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
