import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartWidget = () => {
  const { totalQuantity } = useContext(CartContext);

  return (
    <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
      <div style={{ position: "relative", cursor: "pointer" }}>
        🛒
        {totalQuantity() > 0 && (
          <span
            style={{
              position: "absolute",
              top: -8,
              right: -10,
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "3px 7px",
              fontSize: "12px",
            }}
          >
            {totalQuantity()}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartWidget;
