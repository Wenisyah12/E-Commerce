import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Preferences from "./pages/Preferences";

export default function App() {
  return (
    <div className="wrap">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<ProductDetail />} />      
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/preferences" element={<Preferences />} />
      </Routes>
    </div>
  );
}

