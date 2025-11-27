import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Brand Section */}
        <div className="footer-col">
          <h2 className="footer-logo">AURORA</h2>
          <p className="footer-text">
            Design your comfort with timeless pieces.
          </p>
        </div>

        {/* Shop */}
        <div className="footer-col">
          <h3>Shop</h3>
          <ul>
            <li><a href="#">All Products</a></li>
            <li><a href="#">Seating</a></li>
            <li><a href="#">Tables</a></li>
            <li><a href="#">Storage</a></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer-col">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">Register</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-col">
          <h3>Support</h3>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

      </div>

      <hr className="footer-divider" />

      <p className="footer-copy">
        © 2025 Aurora Furniture. All rights reserved. Demo Frontend.
      </p>
    </footer>
  );
};

export default Footer;
