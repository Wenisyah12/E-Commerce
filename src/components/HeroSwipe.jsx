import { useState, useEffect, useRef } from "react";

export default function HeroSwipe({images}) {
    const [index, setIndex] = useState(0);
    const touchStartX = useRef(null);

    useEffect(() => {
        if (images.length <= 1)
            return;
        const timer =setInterval(() =>{
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    },[images.length]);

    function goNext() {
        setIndex((prev) => (prev+1) % images.length);
    }

    function goPrev() {
        setIndex((prev) => (prev-1 + images.length) % images.length);
    }

    function handleTouchStart(e) {
        touchStartX.current = e.touches[0].clientX;
    }

    function handleTouchEnd(e) {
        if (touchStartX.current === null) 
            return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff>50) 
            goNext;
        else if(diff<-50)
            goPrev;
        touchStartX.current = null;
    }

    if(images.length === 0)
        return null;

    return (
      <div
        className="glass hero-visual"
        style={{ position: "relative", overflow: "hidden", padding: 0 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
    >
      <img
        src={images[index]}
        alt=""
        style={{ maxHeight: "80%", maxWidth: "80%", objectFit: "contain" }}
      />

      <button
        onClick={goPrev}
        className="icon-btn"
        style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)" }}
      >
        ‹
      </button>
      <button
        onClick={goNext}
        className="icon-btn"
        style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)" }}
      >
        ›
      </button>

      <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5 }}>
        {images.map((_, i) => (
          <span
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: i === index ? "var(--btn-1)" : "var(--glass-border)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
