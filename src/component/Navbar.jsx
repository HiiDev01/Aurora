import React, { useEffect, useRef, useState } from 'react'
import '../styles/Navbar.css'
import { LayoutGrid, House, Info, Phone, ShoppingCart, LogIn,UserRoundPen,LogOut   } from 'lucide-react';
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";


const navItems = [
    { name: 'Home', page: '/', icon:  <House size={18}/> },
    { name: 'Products', page: '/product', icon:   <LayoutGrid size={18}/> },
    { name: 'About', page: '/about', icon: <Info size={18}/> },
    { name: 'Contact', page: '/contact', icon: <Phone size={18}/> },
];
const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [authAvatar, setAuthAvatar] = useState(false)
  const boxRef = useRef(null);


  const handleAvatarClick = () =>{
    setAuthAvatar(prev => !prev)
  }

  useEffect(() => {
    const handleClickOutsideAvatar = (event) => {
      if (authAvatar && boxRef.current && !boxRef.current.contains(event.target)) {
        setAuthAvatar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideAvatar);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAvatar);
    };
  }, [authAvatar]);



  return (
    <div className='navbar'>
      <div className='nav-inner'>
        <div className="logo"><h1>AURORA</h1></div>
        <ul className='navListCon'>
          {navItems.map((item, i)=> (
            <li key={i}>
              <a href={item.page}>{item.icon} {item.name}</a>
            </li>
          ))}
        </ul>
        <div className="auth">
          <a href='/cart' className='authLink'><ShoppingCart size={30}/> 
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}   
          </a>
          {user ? (
            <div className='userAvatar' onClick={handleAvatarClick} ref={boxRef}>
              <UserRoundPen />
              {authAvatar && (
                <div className='userDropDown'>
                  <p>Welcome:</p>
                  <span>{user.email}</span>
                  <a href="/order" className='ordhis'>order history</a>
                  <button onClick={logout} className="logout-btn"><LogOut size={16}/> Logout</button>
                </div>
            )}
            </div>
          ) : (
            <a href="/login" className='authLink'>
              <LogIn  size={20}/>login
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
