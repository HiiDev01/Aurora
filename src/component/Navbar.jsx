import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { LayoutGrid, House, Info, Phone, ShoppingCart, LogIn, UserRoundPen, LogOut, Menu } from 'lucide-react';
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { name: 'Home', page: '/', icon: <House size={18}/> },
  { name: 'Products', page: '/product', icon: <LayoutGrid size={18}/> },
  { name: 'About', page: '/about', icon: <Info size={18}/> },
  { name: 'Contact', page: '/contact', icon: <Phone size={18}/> },
];

const Navbar = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [authAvatar, setAuthAvatar] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const boxRef = useRef(null);
  const navRef = useRef(null);
  const navigate = useNavigate();

  const handleAvatarClick = () => setAuthAvatar(prev => !prev);

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  const handleHamburgerClick = () =>{
    setHamburgerOpen(prev=>!prev)
  }

  // Close avatar dropdown when clicking outside
  useEffect(() => {
    const handleClickOutsideAvatar = (e) => {
      if (authAvatar && boxRef.current && !boxRef.current.contains(e.target)) {
        setAuthAvatar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideAvatar);
    return () => document.removeEventListener('mousedown', handleClickOutsideAvatar);
  }, [authAvatar]);

  // Close hamburger menu when clicking outside
  useEffect(()=>{
    const clickOutsideMenu = (e) =>{
        if(hamburgerOpen && navRef.current && !navRef.current.contains(e.target)){
          setHamburgerOpen(false); 
        }
    };
    document.addEventListener('mousedown', clickOutsideMenu);
    return ()=> document.removeEventListener('mousedown', clickOutsideMenu);
  }, [hamburgerOpen])


  return (
    <nav className="navbar">
      <div className="nav-inner">
        {/* Logo */}
        <div className="logo">
          <Link to="/"><h1>AURORA</h1></Link>
        </div>

        {/* Menu Links */}
        <ul ref={navRef} className={`navListCon ${hamburgerOpen ? 'open' : ''}`}>
          {navItems.map((item, i) => (
            <li key={i}>
              <Link to={item.page} onClick={() => setHamburgerOpen(false)} >
                {item.icon} {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth / Cart / Hamburger */}
        <div className="auth">
          <Link to="/cart" className="authLink">
            <ShoppingCart size={30}/>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {user ? (
            <div className="userAvatar" onClick={handleAvatarClick} ref={boxRef}>
              <UserRoundPen />
              {authAvatar && (
                <div className="userDropDown">
                  <p>Welcome:</p>
                  <span>{user.email}</span>
                  <Link to="/order" className="ordhis">Order History</Link>
                  <button onClick={handleLogout} className="logout-btn">
                    <LogOut size={16}/> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="authLink">
              <LogIn size={20}/> Login
            </Link>
          )}

          {/* Hamburger button */}
          <button onClick={handleHamburgerClick}  className='hamburger'>
            <Menu size={30} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
