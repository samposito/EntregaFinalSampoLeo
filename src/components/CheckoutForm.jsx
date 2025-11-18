import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const CheckoutForm = () => {
  const { cart, totalPrice, emptyCart } = useContext(CartContext);

  const [buyer, setBuyer] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      buyer,
      items: cart,
      total: totalPrice(),
      date: Timestamp.now(),
    };

    const ordersRef = collection(db, "orders");

    try {
      const doc = await addDoc(ordersRef, order);
      setOrderId(doc.id);
      emptyCart();
    } catch (error) {
      console.log("Error creando orden:", error);
    }
  };

  if (orderId) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>¡Gracias por tu compra! 🎉</h2>
        <p>Tu número de orden es:</p>
        <h3 style={{ color: "green" }}>{orderId}</h3>

        <a href="/">
          <button style={{ marginTop: "15px" }}>Volver al inicio</button>
        </a>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Finalizar compra</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={buyer.name}
          onChange={handleChange}
          required
        />

        <label>Teléfono:</label>
        <input
          type="tel"
          name="phone"
          value={buyer.phone}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={buyer.email}
          onChange={handleChange}
          required
        />

        <button type="submit" style={{ marginTop: "15px" }}>
          Confirmar compra
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
