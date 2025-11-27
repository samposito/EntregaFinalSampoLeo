import { Link } from "react-router-dom";
import { useState } from "react";
import CartWidget from "./CartWidget";
import CartSidebar from "./CartSidebar";
import "./NavBar.css"; 

const NavBar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <header className="navbar">
      <nav className="nav-container">

      
        <Link to="/" className="nav-logo">
          MiEcommerce
        </Link>

       
        <ul className="nav-links">
          <li>
            <Link to="/category/electronics">Electrónica</Link>
          </li>
          <li>
            <Link to="/category/hogar">Hogar</Link>
          </li>
          <li>
            <Link to="/category/moda">Moda</Link>
          </li>
        </ul>

        
        <div className="nav-cart-area" onClick={() => setOpenSidebar(true)}>
          <CartWidget />
        </div>
      </nav>

      
      <CartSidebar
        isOpen={openSidebar}
        closeSidebar={() => setOpenSidebar(false)}
      />
    </header>
  );
};

export default NavBar;
