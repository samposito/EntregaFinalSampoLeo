import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";   

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsRef = collection(db, "products");

    getDocs(productsRef).then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(items);
    });
  }, []);

  return (
    <div>
      <h2>Productos</h2>

      {products.length === 0 && <p>Cargando productos...</p>}

      {products.map((prod) => (
        <div key={prod.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <Link to={`/item/${prod.id}`} style={{ textDecoration: "none", color: "black" }}>
            <h3>{prod.title}</h3>
          </Link>

          <p>Precio: ${prod.price}</p>
          <p>Stock: {prod.stock}</p>
          <p>Categoría: {prod.category}</p>
          <img src={prod.image} width="150" />
        </div>
      ))}
    </div>
  );
};

export default ItemListContainer;
