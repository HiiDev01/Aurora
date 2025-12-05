import React, { useEffect, useState } from "react";
import "../styles/DetailPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

const SingleProduct = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const handleFetchSingleProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log("error: can't fetch api");
    }
  };

  useEffect(() => {
    handleFetchSingleProduct();
  }, [id]);

  if (!product) return <h2 style={{ padding: "40px" }}>Loading product...</h2>;

  return (
    <div className="single-container">
      <div className="wrapper">
        <button className="backBtn" onClick={() => navigate("/product")}>
          <ChevronLeft /> back to product
        </button>

        <div className="wrap">
          <div
            className="banner"
            style={{
              backgroundImage: `url(${product.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div className="product-info">
            <h1 className="single-title">{product.title}</h1>
            <h4>${product.price}</h4>

            <h3>Description</h3>
            <p>{product.description}</p>

            <h3>Details</h3>
            <ul>
              <li>Category: {product.category}</li>
              <li>Rating: {product.rating?.rate} ⭐</li>
              <li>Delivery: 3–5 business days</li>
            </ul>

            <button onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
