import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase/config";
import "./ItemListContainer.css";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const productsRef = collection(db, "products");

    const q = categoryId
      ? query(productsRef, where("category", "==", categoryId))
      : productsRef;

    getDocs(q).then((snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(items);
    });
  }, [categoryId]);

  return (
    <div className="list-wrapper">
      <h2 className="title">
        {categoryId ? `Categoría: ${categoryId}` : "Productos"}
      </h2>

      {products.length === 0 && <p>Cargando productos...</p>}

      <div className="grid">
        {products.map((prod) => (
          <div key={prod.id} className="card">
            <img
              src={new URL(`../assets/products/${prod.image}`, import.meta.url).href}
              alt={prod.title}
              className="card-img"
            />
            <h3 className="card-title">{prod.title}</h3>
            <p className="card-price">${prod.price}</p>
            <p className="card-category">{prod.category}</p>

            <Link to={`/item/${prod.id}`} className="btn">
              Ver detalle
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;
