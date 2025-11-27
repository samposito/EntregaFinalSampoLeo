import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (product, quantity = 1) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id
            ? { ...p, quantity: Math.min((p.quantity || 0) + quantity, product.stock ?? Infinity) }
            : p
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  };

  const addToCart = (product, quantity = 1) => addItem(product, quantity);

  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCart([]);

  const updateItemQuantity = (id, newQuantity) => {
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: newQuantity } : p))
    );
  };

  const totalCart = () => cart.reduce((s, p) => s + (p.price || 0) * (p.quantity || 0), 0);

  const totalQuantity = () => cart.reduce((s, p) => s + (p.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        addToCart,            
        removeItem,
        clearCart,
        updateItemQuantity,
        totalCart,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
