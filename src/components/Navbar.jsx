import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar(){
    const { cartCount } = useCart();
    const {t} = useLanguage();

    return(
        <div className="glass" style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", marginBottom: 16 }}>
            <Link to="/" className="link" style={{fontWeight: 700, textDecoration: "none", color: "inherit"}}>Tokoku</Link>
            <div style={{display: "flex", gap:12, alignItems:"center"}}>
                <Link to="/catalog" className="link" style={{color: "var(--text-main)", textDecoration: "none"}}>{t("catalog")}</Link>
                <Link to="/cart" className="icon-btn" style={{textDecoration: "none"}}>🛍️ {cartCount > 0 ? `(${cartCount})` : ""}</Link>
                <Link to="/preferences" className="icon-btn" style={{ textDecoration: "none" }}>⚙️</Link>
            </div>
        </div>
    );
}
