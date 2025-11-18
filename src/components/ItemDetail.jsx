import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import ItemCount from "./ItemCount";
import { Link } from "react-router-dom";

const ItemDetail = ({ item }) => {
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  const handleAdd = (quantity) => {
    addToCart(item, quantity);
    setAdded(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{item.title}</h2>

      <img src={item.image} alt={item.title} width="250" />

      <p><strong>Precio:</strong> ${item.price}</p>
      <p><strong>Stock:</strong> {item.stock}</p>
      <p><strong>Categoría:</strong> {item.category}</p>
      <p><strong>Descripción:</strong> {item.description}</p>

      {!added && (
        <ItemCount stock={item.stock} onAdd={handleAdd} />
      )}

      
      {added && (
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "green" }}>Producto agregado al carrito ✔</h3>

          <Link to="/cart">
            <button style={{ marginTop: "10px" }}>
              Ir al carrito
            </button>
          </Link>

          <Link to="/">
            <button style={{ marginLeft: "10px" }}>
              Seguir comprando
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
