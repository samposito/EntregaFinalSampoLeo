import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./ItemDetail.css";

const ItemDetail = ({ item }) => {
  const { addItem } = useContext(CartContext);
  const [count, setCount] = useState(1);

  if (!item) return <p>Cargando producto...</p>;

  const increase = () => {
    if (count < item.stock) setCount(count + 1);
  };

  const decrease = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleAdd = () => {
    addItem(item, count);
  };

  return (
    <div className="detail-container">

      <img
        src={new URL(`../assets/products/${item.image}`, import.meta.url).href}
        alt={item.title}
        className="detail-img"
      />

      <h2 className="detail-title">{item.title}</h2>
      <p className="detail-price">Precio: ${item.price}</p>
      <p className="detail-stock">Stock: {item.stock}</p>

      <div className="detail-counter">
        <button onClick={decrease} className="counter-btn">−</button>
        <span className="counter-value">{count}</span>
        <button onClick={increase} className="counter-btn">+</button>
      </div>

      <button className="btn-add" onClick={handleAdd}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemDetail;
