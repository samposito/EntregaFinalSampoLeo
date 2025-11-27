import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const docRef = doc(db, "products", id);

    getDoc(docRef).then((snapshot) => {
      if (snapshot.exists()) {
        setItem({ id: snapshot.id, ...snapshot.data() });
      } else {
        console.log("El producto no existe");
      }
    });
  }, [id]);

  return (
    <div>
      {!item && <p>Cargando producto...</p>}
      {item && <ItemDetail item={item} />}
    </div>
  );
};

export default ItemDetailContainer;
