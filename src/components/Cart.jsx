import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, totalPrice, emptyCart } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>El carrito está vacío 🛒</h2>
        <Link to="/">
          <button>Volver a comprar</button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Carrito</h2>

      {cart.map((prod) => (
        <div key={prod.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{prod.title}</h3>
          <p>Cantidad: {prod.quantity}</p>
          <p>Precio unidad: ${prod.price}</p>
          <p>Subtotal: ${prod.quantity * prod.price}</p>
        </div>
      ))}

      <h2>Total a pagar: ${totalPrice()}</h2> 

      <button onClick={emptyCart} style={{ marginRight: "10px" }}>
        Vaciar carrito
      </button>

      <Link to="/checkout">
        <button>Finalizar compra</button>
      </Link>
    </div>
  );
};

export default Cart;
