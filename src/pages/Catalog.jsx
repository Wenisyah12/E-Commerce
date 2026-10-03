import { useState, useEffect } from "react";
import { getProducts } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useLanguage } from "../context/LanguageContext";

export default function Catalog(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [category, setCategory] =useState("all");
    const { t } = useLanguage();

    useEffect(() => {
        getProducts()
        .then((data) => setProducts(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, []);

    if(loading)
        return <p>{t("loading")}</p>;
    if(error)
        return <p>{t("fail")}</p>

    const categories = ["all", ...new Set(products.map((p) => p.category)) ];


    const filtered = products.filter((p) =>{
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === "all" || p.category === category;
        return matchSearch && matchCategory;
    });

    return(
        <>
        <input
            type="text"
            placeholder={t("find")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="glass"
            style={{width: "100%", border: "none", padding:12, marginBottom: 12, color: "var(--text-main)", fontSize: 14}}
            />

        <div style={{display:"flex", gap: 8, overflowX: "auto", paddingBottom: 12, marginBottom:12}}>
            {categories.map((cat) => (
            <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cat === category ? "icon-btn" : "icon-btn"}
                style={{
                    whiteSpace  : "nowrap",
                    fontWeight  : cat === category ? 700 : 400,
                    background  : cat === category ? "var(--glass-bg-strong)" : "var(--glass-bg)",
                }}                
            >
                {cat}
            </button>
            ))}
        </div>
        
        {filtered.length === 0 ? (
            <p>{t("noMatch")}</p>
        ) : (
            <div className="product-grid">
                {filtered.map((p) => (
                <ProductCard key={p.id} product={p}/>    
                ))}
            </div>
        )}
        </>
    );
}