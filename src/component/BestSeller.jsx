import React, { useEffect, useState } from "react";
import "../styles/BestSeller.css";
import { useCart } from "../context/CartContext";
import StarRating from "./StarRating";


const BestSellers = () => {
  const [bestSell, setBestSell] = useState([]);
  const [error, setError] = useState('')
  const { addToCart } = useCart()

  const bestSelling = async() =>{
    setError('');
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=6&sort=desc')
      if(!response.ok){
        setError('error fetching product')
        throw new Error 
      }
      const data = await response.json()
      setBestSell(data)
    } catch (error) {
      console.log("error fetching best selling product")
    }
  }

  useEffect(()=>{
    bestSelling();
  }, [])

  return (
    <div className="best-container">
      <h2 className="best-title">Our Best Sellers</h2>

      <div className="best-grid">
        {bestSell.map((item, i) => (
          <div className="best-card" key={i}>
            <a href={`/product/${item.id}`}>
              <div className="best-card-ImgCon">
                <img src={item.image} alt={item.title} />
              </div>
            </a>
            <div className="bestCardDet">
              <h1>
                {item?.title?.length > 30
                  ? item.title.slice(0, 25) + ""
                  : item?.title}
              </h1>
              <div className="">
                <h3 className="best-sub">
                  {item?.description?.length > 30
                   ? item.description.slice(0, 120) + "..."
                   : item?.description
                  }
                </h3>
                <div className="bestDes">
                  <StarRating rating={item?.rating?.rate}/>
                  <h2 className="price">${item.price}</h2>
                </div>
                <button className="cartBtn" onClick={()=> addToCart(item)}>add to cart</button>
              </div>
              
            </div>
          </div>
        ))}
      </div>
      <a href="/product"
        className=""
       style={{display: "block",
        width: "max-content",
        padding: "15px 30px", 
        textDecoration: "none",
        margin: "0px auto",
       border: "1px solid var(--color-text-light)",
       fontSize: "1rem",
       fontFamily: "var(--font-two)",
       textTransform: "capitalize",
       fontWeight: "500",
       color: "var(--color-text-light)"}}>
        veiw all product</a>
    </div>
  );
};

export default BestSellers;
