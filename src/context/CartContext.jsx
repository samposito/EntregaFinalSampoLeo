import { createContext, useState } from "react";

export const CartContext = createContext();  

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item, quantity) => {
    const exists = cart.find((prod) => prod.id === item.id);

    if (exists) {
      setCart(
        cart.map((prod) =>
          prod.id === item.id
            ? { ...prod, quantity: prod.quantity + quantity }
            : prod
        )
      );
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  const totalQuantity = () =>
    cart.reduce((acc, prod) => acc + prod.quantity, 0);

  const totalPrice = () =>
    cart.reduce((acc, prod) => acc + prod.quantity * prod.price, 0);

  const emptyCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, totalQuantity, totalPrice, emptyCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
