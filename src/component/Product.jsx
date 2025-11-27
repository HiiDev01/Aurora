import React, { useEffect, useState } from "react";
import "../styles/Product.css";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Pagination from "./Pagination";

/*const products = [
  {
    id: 1,
    name: "Sofa",
    title: "The Minimalist Sofa",
    category: "Seating",
    price: 1200.0,
    bg: "#dcdcdc"
  },
  {
    id: 2,
    name: "Table",
    title: "Oak Dining Table",
    category: "Tables",
    price: 850.5,
    bg: "#d4d1c9"
  },
  {
    id: 3,
    name: "Armchair",
    title: "Velvet Armchair",
    category: "Seating",
    price: 450.0,
    bg: "#cec4d4"
  },
  {
    id: 4,
    name: "Bookcase",
    title: "Scandinavian Bookcase",
    category: "Storage",
    price: 320.0,
    bg: "#e6e0d3"
  },
  {
    id: 5,
    name: "Rug",
    title: "Geometric Rug",
    category: "Decor",
    price: 180.0,
    bg: "#d3d3d3"
  }
];*/

const Products = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;




  const handleFetchProduct = async() =>{
    try {
      const response = await fetch('http://localhost:8080/products')
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
       console.error("Error fetching products:", error);
    }
  }
   useEffect(()=>{
    handleFetchProduct();
   },[]);

  // Slice based on current page
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
                <div
                  className="product-top"
                  
                >
                  <h1>{product.name}</h1>
                </div>
              </Link>
  
              <div className="product-bottom">
                <h3>{product.title}</h3>
                <p className="category">{product.category}</p>
  
                <div className="product-footer">
                  <span className="price">${Number(product.price).toFixed(2)}</span>
                  <button className="cart-btn"  onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
  
              </div>
            </div>
      
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Products;
