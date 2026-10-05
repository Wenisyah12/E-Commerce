import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import HeroSwipe from "../components/HeroSwipe";

export default function Home(){
    const [products, setProducts]= useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {themePref} = useTheme();
    const { t } = useLanguage();

    useEffect(() => {
       loadProducts() 
        setLoading(true);
        setError(null);
        getProducts()
        .then((data) => setProducts(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    },[]);
    
    if(loading) {
        return <p>{t("loading")}</p>;
    }

    if(error){
        return (
        <div className="glass" style={{padding: 20, textAlign: "center",}}>
        <p>{t("fail")}</p>
        <button className="btn-primary" onClick={loadProducts}>{t("again")}</button>
        </div>
    );
}
    const isDark = themePref === "dark";

    return (
    <div>
      <div className="glass hero">
        <div>
        <span className="hero-eyebrow">{isDark ? t("heroEyebrowDark") : t("heroEyebrowLight")}</span>
        <p className="hero-title">{isDark ? t("heroTitleDark") : t("heroTitleLight")}</p>
        <p className="hero-sub">{isDark ? t("heroSubDark") : t("heroSubLight")}</p>
        <Link to="/catalog" className="btn-primary" style={{ display: "inline-block", padding: "12px 20px", textDecoration: "none" }}>
            {isDark ? t("heroBtnDark") : t("heroBtnLight")}
        </Link>
        </div>
        {!loading && !error && (
        <HeroSwipe images={products.slice(0, 5).map((p) => p.image)} />
        )}
      </div>

      <div className="cat-row">
        <Link to="/catalog" className="glass cat-icon" style={{ textDecoration: "none", color: "var(--text-main)" }}>
          <span className="ico">🏠</span><span>{t("catHome")}</span>
        </Link>
        <Link to="/catalog" className="glass cat-icon" style={{ textDecoration: "none", color: "var(--text-main)" }}>
          <span className="ico">🎨</span><span>{t("catStyle")}</span>
        </Link>
        <Link to="/catalog" className="glass cat-icon" style={{ textDecoration: "none", color: "var(--text-main)" }}>
          <span className="ico">💡</span><span>{t("catTech")}</span>
        </Link>
        <Link to="/catalog" className="glass cat-icon" style={{ textDecoration: "none", color: "var(--text-main)" }}>
          <span className="ico">🎁</span><span>{t("catGift")}</span>
        </Link>
      </div>

      <div className="section-head">
        <p className="section-title">{t("favTitle")}</p>
        <Link to="/catalog" className="section-link" style={{ textDecoration: "none" }}>{t("seeAll")}</Link>
      </div>

      {loading && <p>{t("loading")}</p>}
      {error && <p>{t("fail")}</p>}
      {!loading && !error && (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}