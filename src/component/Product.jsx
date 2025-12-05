import React, { useEffect, useState } from "react";
import "../styles/Product.css";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Pagination from "./Pagination";
import StarRating from "./StarRating";

const Products = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const normalizePrice = (price) => {
    if (typeof price === "object" && price !== null) return price.amount || 0;
    return Number(price) || 0;
  };

  const handleFetchProduct = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("Failed to fetch products");

      const result = await response.json();
      // Ensure price is numeric
      const normalized = result.map((p) => ({
        ...p,
        price: normalizePrice(p.price),
      }));

      setProducts(normalized);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    handleFetchProduct();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="products-container">
      <h2 className="products-title">All Products</h2>
      <div className="products-grid">
        {currentProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <Link to={`/product/${product.id}`}>
              <div className="product-top">
                <img src={product.image} alt={product.category} />
              </div>
            </Link>

            <div className="product-bottom">
              <h3>{product.category}</h3>
              <p className="category">
                {product.description ? product.description.slice(0, 60) + "..." : "No description"}
              </p>
              <StarRating rating={product.rating?.rate || 0} />
              <div className="product-footer">
                <span className="price">${Number(product.price).toFixed(2)}</span>
                <button className="cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default Products;
