import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

export default function Checkout() {
    const {cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [form, setForm] = useState({name: "", phone: "", address: "" });
    const [submitted, setSubmitted] = useState(false);
    const { t } = useLanguage();

    function handleChange(e) {
     setForm({...form, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        clearCart();
        setSubmitted(true);
    }

    if (submitted) {
        return(
            <div className="glass" style={{padding: 30, textAlign: "center"}}>
                <p style={{fontSize: 40, margin: "0 0 10px"}}>✅</p>
                <h2 style={{margin: "0 0 6px"}}>{t("orderSuccess")}</h2>
                <p style={{color: "var(--text-muted", marginBottom: 16}}>{t("orderSuccessDesc")}{form.name || "pelanggan"}! Pesananmu sedang diproses.</p>
                <button className="btn-primary" onClick={() => navigate("/")}>{t("backHome")}</button>
            </div>
        );
    }

    if (cart.length === 0) {
        return <p>{t("emptyCart")}</p>;
    }

    return (
        <>
        <h2>{t("checkoutTitle")}</h2>
        <form onSubmit={handleSubmit}>
            <div className="glass" style={{padding: 16, marginBottom: 16}}>
                <label style={{display:"block", fontSize: 12, color: "var(--text-muted", marginBottom: 4}}>{t("fullName")}</label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={{width: "100%", border: "none", borderBottom: "1px solid var(--glass-border)", background: "transparent", padding:8, marginBottom: 14, color: "var(--text-main)", fontSize: 14 }}
                />


                <label style={{display:"block", fontSize: 12, color: "var(--text-muted", marginBottom: 4}}>{t("phone")}</label>
                <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    style={{width: "100%", border: "none", borderBottom: "1px solid var(--glass-border)", background: "transparent", padding:8, marginBottom: 14, color: "var(--text-main)", fontSize: 14 }}
                />


                <label style={{display:"block", fontSize: 12, color: "var(--text-muted", marginBottom: 4}}>{t("address")}</label>
                <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    style={{width: "100%", border: "none", borderBottom: "1px solid var(--glass-border)", background: "transparent", padding:8, marginBottom: 14, color: "var(--text-main)", fontSize: 14 }}
                />
            </div>

            <div className="glass" style={{padding: 16, marginBottom:6}}>
                <p style={{fontWeight: 700, marginTop: 0}}>{t("orderSummary")}</p>
                {cart.map((item) =>(
                    <div key={item.id} style={{display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6}}>
                        <span>{item.title} x {item.qty}</span>
                        <span>${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                ))}
                    <div style={{display: "flex", justifyContent:"space-between", fontWeight: 700, marginTop: 10, borderTop:"1px solid var(--glass-border)", paddingTop: 10}}>
                        <span>{t("total")}</span>
                        <span className="price">${cartTotal.toFixed(2)}</span>
                    </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: "100%", padding: 14 }}>
            {t("placeOrder")}
            </button>
        </form>
        </>
    );
}