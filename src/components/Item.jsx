const Item = ({ product }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        width: "200px",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <img src={product.image} width="180" height="180" />
      <h3>{product.title}</h3>
      <p>Precio: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <p>Categoría: {product.category}</p>
    </div>
  );
};

export default Item;
