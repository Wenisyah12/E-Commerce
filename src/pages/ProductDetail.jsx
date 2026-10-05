import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { getProductById } from "../data/products";

export default function ProductDetail(){
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        setLoading(true);
        getProductById(id)
        .then((data) => setProduct(data))
        .finally(() => setLoading (false));
    }, [id]);

    if(loading)
        return <p>{t("loading")}</p>;
    if(!product)
        return <p>{t("notFound")}</p>;

    return(
        <>
        <Link to="/" className="icon-btn" style={{textDecoration: "none", display: "inline-block", marginBottom:12}}>
        ← {t("back")}
        </Link>
        <div className="glass" style={{padding: 20}}>
            <div style={{height: 220, display: "flex", alignItems: "center", justifyContent:"center", marginBottom16}}>
                <img src={product.image} alt={product.title} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
            </div>
            <h2 style={{ margin: "0 0 8px" }}>{product.title}</h2>
            <p className="price" style={{ fontSize: 20, margin: "0 0 12px" }}>${product.price}</p>
            <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{product.description}</p>
            <button className="btn-primary" style={{ width: "100%" }} onClick={() => addToCart(product)}>
                 {t("addToCart")}
            </button>
        </div>
        </>
    );
}

