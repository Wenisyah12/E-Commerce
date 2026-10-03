import { useTheme } from "../context/ThemeContext";
import { useInputMode } from "../context/InputModeContext";
import { useLanguage } from "../context/LanguageContext";

const optionCardStyle = (selected) => ({
    border: `2px solid ${selected ? "var(--text-main)" : "var(--glass-border"}`,
    background: selected ? "var(--glass-bg-strong)" : "var(--glass-bg)",
    borderRadius: 14,
    padding: 12,
    textAlign: "center",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
});

export default function Preferences() {
    const {themePref, setThemePref} = useTheme();
    const {inputPref, setInputPref} = useInputMode();
    const {lang, setLang, t} = useLanguage();

    return (

        <>
        <h2>{t("pref")}</h2>
        
        <div className="glass" style={{padding:18, marginBottom: 16}}>
            <p style={{fontWeight:700, margin: "0 0 4px"}}>{t("look")}</p>
            <p style={{fontSize: 12, color: "var(--text-muted)", margin: "0 0 12px"}}>
                {t("choose")}
            </p>
            <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10}}>
                <div style={optionCardStyle(themePref === "light")} onClick={() => setThemePref("light")}>☀️<br />Day</div>
                <div style={optionCardStyle(themePref === "dark")} onClick={() => setThemePref("dark")}>🌙<br />Night</div>
                <div style={optionCardStyle(themePref === "system")} onClick={() => setThemePref("system")}>🔄<br />Sistem</div> 
            </div>
        </div>

        <div className="glass" style={{padding: 18, marginBottom:16}}>
            <p style={{fontWeight:700, margin: "0 0 4px"}}>{t("language")}</p>
            <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "0 0 12px" }}>
                {t("langPref")}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
            <div style={optionCardStyle(lang === "id")} onClick={() => setLang("id")}>Indonesia</div>
            <div style={optionCardStyle(lang === "en")} onClick={() => setLang("en")}>English</div>
            </div>
        </div>

        <div className="glass" style={{padding: 18}}>
            <p style={{fontweight: 700, margin: "0 0 4px"}}>{t("metInput")}</p>
            <p style={{fontSize: 12, color: "var(--text-muted)", margin: "0 0 12px"}}>
                {t("way")}
            </p>
            {[
                { key: "auto", label: "Otomatis", desc: t("ware")},
                { key: "touch", label: "Touch", desc: t("touch")},
                { key: "mouse", label: "Mouse", desc: t("mouse")},
                { key: "keyboard", label: "Keyboard", desc: t("keyb")},
            ].map((opt) => (
               <label 
                key={opt.key}
                style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    border: `2px solid ${inputPref === opt.key ? "var(--text-main)" : "var(--glass-border)"}`,
                    background: inputPref === opt.key ? "var(--glass-bg-strong)" : "transparent",
                    borderRadius: 14,
                    padding: 12,
                    marginBottom: 8,
                    cursor: "pointer",
               }} 
               >
            <input
              type="radio"
              name="inputmode"
              checked={inputPref === opt.key}
              onChange={() => setInputPref(opt.key)}
            />
            <span>
              <span style={{ fontWeight: 700, fontSize: 13.5, display: "block" }}>{opt.label}</span>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{opt.desc}</span>
            </span> 
            </label>
            ))}
        </div>
        </>
    );
}