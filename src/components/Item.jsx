import { Link } from "react-router-dom";

const Item = ({ id, title, price, image }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "16px",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "0.3s",
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "contain",
          marginBottom: "10px",
        }}
      />

      <h3 style={{ fontSize: "1.2rem", minHeight: "50px" }}>{title}</h3>

      <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>${price}</p>

      <Link
        to={`/item/${id}`}
        style={{
          display: "inline-block",
          padding: "10px 16px",
          marginTop: "10px",
          background: "#007bff",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
          transition: "0.3s",
        }}
      >
        Ver detalle
      </Link>
    </div>
  );
};

export default Item;
