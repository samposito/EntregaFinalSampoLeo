function CartItem({ item }) {
  return (
    <div style={{ borderBottom: "1px solid #ddd", marginBottom: "10px" }}>
      <h4>{item.nombre}</h4>
      <p>Precio: ${item.precio}</p>
      <p>Cantidad: {item.cantidad}</p>
    </div>
  )
}

export default CartItem
