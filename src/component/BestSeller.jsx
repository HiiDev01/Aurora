import React from "react";
import "../styles/BestSeller.css";

const bestSellers = [
  {
    title: "Seating",
    subtitle: "Sofas & Seating",
    desc: "Ultimate comfort and style."
  },
  {
    title: "Dining",
    subtitle: "Dining Tables",
    desc: "Gather, feast, and connect."
  },
  {
    title: "Storage",
    subtitle: "Storage Solutions",
    desc: "Organize your space elegantly."
  }
];

const BestSellers = () => {
  return (
    <div className="best-container">
      <h2 className="best-title">Our Best Sellers</h2>

      <div className="best-grid">
        {bestSellers.map((item, i) => (
          <div className="best-card" key={i}>
            <h1 className="best-main">{item.title}</h1>
            <div className="overlay">
              <h3 className="best-sub">{item.subtitle}</h3>
              <p className="best-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
