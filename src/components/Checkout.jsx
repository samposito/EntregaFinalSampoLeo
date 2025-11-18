import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const Checkout = () => {
  const { cart, totalPrice, emptyCart } = useContext(CartContext);

  const [buyer, setBuyer] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDACIONES
    if (!buyer.name || !buyer.phone || !buyer.email) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(buyer.email)) {
      setError("El email no es válido.");
      return;
    }

    if (!/^[0-9]+$/.test(buyer.phone)) {
      setError("El teléfono solo debe contener números.");
      return;
    }

    setError("");

    const order = {
      buyer,
      items: cart,
      total: totalPrice(),
      date: Timestamp.now(),
    };

    try {
      const ordersRef = collection(db, "orders");
      const docRef = await addDoc(ordersRef, order);

      setOrderId(docRef.id);
      emptyCart();
    } catch (err) {
      setError("Ocurrió un error al crear la orden. Intenta nuevamente.");
      console.error(err);
    }
  };

  if (orderId) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu número de orden es: <strong>{orderId}</strong></p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Finalizar compra</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
        
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={buyer.name}
          onChange={handleChange}
        />

        <label>Teléfono:</label>
        <input
          type="text"
          name="phone"
          value={buyer.phone}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={buyer.email}
          onChange={handleChange}
        />

        <button type="submit" style={{ marginTop: "20px" }}>
          Crear orden
        </button>
      </form>
    </div>
  );
};

export default Checkout;
