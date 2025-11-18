import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/category/remeras">Remeras</Link>
      <Link to="/category/zapatillas">Zapatillas</Link>
      <Link to="/cart">Carrito</Link>
      <CartWidget />
    </nav>
  );
};

export default NavBar;
