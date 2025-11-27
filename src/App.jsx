import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './component/Navbar'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import DetailPage from './pages/DetailPage'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Footer from './component/Footer'
import ProtectedRoute from './routes/ProtectedRoute'
import Checkout from './component/Checkout '
import OrderSuccess from './component/OrderSuccess'
import OrderHistory from './pages/OrderHistory'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from './pages/Register'



const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <ToastContainer position="top-right" autoClose={1000} />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product" element={<ProductPage/>}/>
        <Route path="/product/:id" element={<DetailPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order-success/:id" element={<OrderSuccess />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order" element={<OrderHistory />} />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout/>
          </ProtectedRoute>
          }
        />

      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
