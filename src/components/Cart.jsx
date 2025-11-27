import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    totalCart,
    removeItem,
    clearCart,
    updateItemQuantity,
  } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <Link to="/" className="btn-go-shop">Ver productos</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">

      <div className="cart-items">
        <h2>Carrito de compras</h2>

        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} className="cart-img" />

            <div className="cart-info">
              <h3>{item.title}</h3>
              <p className="cart-category">{item.category}</p>
              <p className="cart-price">${item.price}</p>

              <div className="cart-qty">
                <button
                  onClick={() =>
                    updateItemQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateItemQuantity(
                      item.id,
                      Math.min(item.quantity + 1, item.stock)
                    )
                  }
                >
                  +
                </button>
              </div>

              <button className="btn-remove" onClick={() => removeItem(item.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}

        <button className="btn-clear" onClick={clearCart}>
          Vaciar Carrito
        </button>
      </div>

      <div className="cart-summary">
        <h2>Resumen</h2>

        <div className="summary-box">
          <p className="summary-row">
            <span>Subtotal:</span> <span>${totalCart()}</span>
          </p>

          <p className="summary-row">
            <span>Envío:</span> <span>$0</span>
          </p>

          <p className="summary-total">
            <span>Total:</span> <span>${totalCart()}</span>
          </p>
        </div>

        <Link to="/checkout" className="btn-checkout">
          Finalizar compra
        </Link>

      </div>

    </div>
  );
};

export default Cart;
