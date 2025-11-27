import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { collection, addDoc, Timestamp, writeBatch, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";

const CheckoutForm = () => {
  const { cart, totalCart, clearCart } = useContext(CartContext);
  const [buyer, setBuyer] = useState({ name: "", phone: "", email: "" });
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setBuyer({ ...buyer, [e.target.name]: e.target.value });

  const validate = () => {
    if (!buyer.name || !buyer.phone || !buyer.email) {
      toast.error("Completa todos los campos");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(buyer.email)) {
      toast.error("Email inválido");
      return false;
    }
    if (!/^[0-9]+$/.test(buyer.phone)) {
      toast.error("Teléfono inválido");
      return false;
    }
    if (!cart || cart.length === 0) {
      toast.error("Carrito vacío");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
   
      const batch = writeBatch(db);
      cart.forEach((p) => {
        const productRef = doc(db, "products", p.id);
        
        batch.update(productRef, { stock: (p.stock ?? 0) - p.quantity });
      });
      
      const ordersRef = collection(db, "orders");
      const order = {
        buyer,
        items: cart,
        total: totalCart(),
        createdAt: Timestamp.now(),
      };
      const orderRef = await addDoc(ordersRef, order);
      
      await batch.commit();

      setOrderId(orderRef.id);
      clearCart();
      toast.success("Orden generada correctamente");
    } catch (err) {
      console.error(err);
      toast.error("Error al crear la orden");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Compra realizada </h2>
        <p>Tu número de orden es: <strong>{orderId}</strong></p>
        <a href="/"><button>Volver al inicio</button></a>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 360 }}>
        <input name="name" placeholder="Nombre" value={buyer.name} onChange={handleChange} />
        <input name="phone" placeholder="Teléfono" value={buyer.phone} onChange={handleChange} />
        <input name="email" placeholder="Email" value={buyer.email} onChange={handleChange} />
        <div>
          <strong>Total a pagar: ${totalCart()}</strong>
        </div>

        <button type="submit" disabled={loading} style={{ marginTop: 8 }}>
          {loading ? "Procesando..." : "Confirmar compra"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
