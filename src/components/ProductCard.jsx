import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";


export default function ProductCard({ product }) {
    const {addToCart} = useCart ();
    const {t} = useLanguage();
    
    return (
        <div className="glass product-card">
            <div to={`/product/${product.id}`} style={{height: 90, display:"flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>
                <img src={product.image} alt={product.title} style={{maxHeight: "100%", maxWidth: "100%", objectFit:"contain"}}/>
            </div>
            <p style={{fontWeight: 700, fontSize: 13.5, margin: "8px 0 4px", color: "var(--text-main)"}}>{product.title}</p>
            <p className="price" style={{fontSize: 14, margin: "0 0 8px"}}>
                ${product.price}
            </p>
            <button className="btn-primary" style={{width: "100%"}} onClick={() => addToCart(product)}>
                {t("addToCart")}
            </button>
        </div>
    );
}