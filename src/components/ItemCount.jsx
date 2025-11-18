import { useState } from "react";

const ItemCount = ({ stock, onAdd }) => {
  const [count, setCount] = useState(1);

  const increase = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAdd = () => {
    if (stock > 0) {
      onAdd(count);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h4>Cantidad</h4>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button onClick={decrease} disabled={count === 1}>
          -
        </button>

        <p style={{ margin: "0 10px" }}>{count}</p>

        <button onClick={increase} disabled={count === stock}>
          +
        </button>
      </div>

      <button
        onClick={handleAdd}
        disabled={stock === 0}
        style={{ marginTop: "15px" }}
      >
        Agregar al carrito
      </button>

      {stock === 0 && <p style={{ color: "red" }}>Sin stock</p>}
    </div>
  );
};

export default ItemCount;
