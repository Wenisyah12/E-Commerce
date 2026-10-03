import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    function addToCart(product) {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if(existing){
                return prev.map((item) =>
                    item.id === product.id ? {...item, qty: item.qty + 1} : item
            );
            }
            return [...prev, {...product, qty: 1}];
        });
    }

    function removeFromCart(id) {
        setCart((prev) => prev.filter((item) => item.id !== id));
    }  

    function updateQty(id, qty){
        setCart((prev) =>
            prev.map((item) => (item.id === id ? {...item, qty:Math.max(1, qty)} : item))
    );
    }
    function clearCart() {
        setCart([]);
    }

    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartTotal = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart(){
    return useContext(CartContext);
}