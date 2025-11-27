import "./CartSidebar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartSidebar = ({ isOpen, closeSidebar }) => {
  const { cart, totalCart, clearCart } = useContext(CartContext);

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Tu Carrito</h2>
        <button className="close-btn" onClick={closeSidebar}>✖</button>
      </div>

      {cart.length === 0 ? (
        <p className="empty-msg">El carrito está vacío</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <p className="cart-item-price">${item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <p className="total">Total: ${totalCart()}</p>

            <button className="btn-clear" onClick={clearCart}>
              Vaciar carrito
            </button>

            <Link to="/checkout" className="btn-checkout" onClick={closeSidebar}>
              Ir a pagar
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartSidebar;
