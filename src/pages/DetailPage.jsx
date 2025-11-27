import React, { useEffect, useState } from "react"
import "../styles/DetailPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from 'lucide-react';
import {useCart } from "../context/CartContext"

const SingleProduct = () => {
  const { addToCart } = useCart();
  const { id } = useParams();  
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const handleFetchSingleProduct = async ()=>{
    try {
      const response = await fetch(`http://localhost:8080/products/${id}`)
      if(!response.ok){
        throw new Error
      }
      const data = await response.json()
      setProduct(data)
    } catch (error) {
      console.log("error: can't fecth api")
    }
  }

  useEffect(()=>{
    handleFetchSingleProduct()
  },[id]);

  if (!product) {
    return <h2 style={{ padding: "40px" }}>Loading product...</h2>;
  }

  const backToProduct = ()=>{
    navigate("/product")
  }


  return (
    <div className="single-container">
      <div className="wrapper">
        <button className="backBtn" onClick={backToProduct}><ChevronLeft /> back to product</button>
        <div className="wrap">
          <div className="banner"   
            style={{
              backgroundImage: `url(${product.thumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}>

          </div>
          <div className="product-info">
            <h1 className="single-title">{product.name}</h1>
            <h4>${product.price}</h4>
            <h3 className="">Description</h3>
            <p>{product.description}</p>
            <h3 className="">Details</h3>
            <ul>
              <li>material:{product.material}</li>
              <li>category:{product.category}</li>
              <li>color:{product.color}</li>
              <li>Delivery: 3-5 business days</li>
            </ul>
            <button onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
