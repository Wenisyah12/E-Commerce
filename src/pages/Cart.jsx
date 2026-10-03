import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"
import { useLanguage } from "../context/LanguageContext";

export default function Cart(){
    const { cart, removeFromCart, updateQty, cartTotal } = useCart();
    const { t } = useLanguage();

    if (cart.length === 0){
        return <p>{t("emptyCart")}</p>
    }

    return (
        <div>
            <h2>{t("cart")}</h2>
            {cart.map((item) => (
              <div key={item.id} className="glass" style={{display: "flex", alignItems:"center", gap: 12, padding: 10, marginBottom: 10 }}>
                <img src={item.image} alt={item.title} style={{width: 40, height:40, objectFit: "contain" }}/>
                <div style={{flex: 1}}>
                    <p style={{margin: 0, fontWeight: 700, fontSize: 13}}>{item.title}</p>
                    <p className="price" style={{margin: 0, fontSize:12}}>${item.price} x {item.qty}</p>
                </div>
                <button className="qty-btn" onClick={() => updateQty(item.id, item.qty -1)}>-</button> 
                <span style={{ fontWeight: 700, minWidth: 16, textAlign: "center"}}>{item.qty}</span>
                <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                <button className="icon-btn" onClick={() => removeFromCart(item.id)}>{t("del")}</button>
              </div>
            ))}
            <h3 className="price">{t("total")}: ${cartTotal.toFixed(2)}</h3>
            <Link to="/checkout" className="btn-primary" style={{ display: "block", textAlign: "center", textDecoration: "none", padding: 12}}>
                {t("checkoutBtn")}
            </Link>
        </div>
    );
}