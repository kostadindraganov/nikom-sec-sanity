/* Industries — SOC Mission Card layout with rotating 3D building per sector.
   Exposes window.IndustrySOC + window.Building3D. */

(function () {
  const { useState, useEffect } = React;

  /* ============ ROTATING 3D BUILDING ============ */
  /* Sector-specific proportions + surface treatments distinguish each building.
     All buildings rotate slowly around Y, with a fixed isometric tilt. */
  const BLD = {
    hospital: { w: 50, d: 50, h: 64, crown: "cross" },
    retail:   { w: 66, d: 46, h: 36, crown: null },
    hotel:    { w: 38, d: 38, h: 78, crown: "spire" },
    ind:      { w: 68, d: 44, h: 38, crown: "vent" },
    office:   { w: 44, d: 44, h: 80, crown: null },
    gov:      { w: 60, d: 48, h: 52, crown: "flag" },
  };

  function Building3D({ k }) {
    const s = BLD[k] || BLD.office;
    const style = {
      "--bw": s.w + "px",
      "--bd": s.d + "px",
      "--bh": s.h + "px",
      "--cy": "-" + Math.round(s.h / 2 + 4) + "px",
    };
    return (
      <div className="b3d-stage" data-k={k}>
        <div className="b3d-shadow" />
        <div className="b3d" style={style}>
          <div className="b3d-face b3d-front" data-k={k} />
          <div className="b3d-face b3d-back"  data-k={k} />
          <div className="b3d-face b3d-left"  data-k={k} />
          <div className="b3d-face b3d-right" data-k={k} />
          <div className="b3d-face b3d-top"   data-k={k} />
          {s.crown === "cross" && (
            <div className="b3d-crown b3d-cross">
              <span className="b3d-cv" />
              <span className="b3d-ch" />
            </div>
          )}
          {s.crown === "spire" && <div className="b3d-crown b3d-spire" />}
          {s.crown === "vent"  && <div className="b3d-crown b3d-vent" />}
          {s.crown === "flag"  && (
            <div className="b3d-crown b3d-flag">
              <span className="b3d-fp" />
              <span className="b3d-fc" />
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ============ TIME / EVENT CYCLING HOOKS ============ */
  function useNow() {
    const [t, setT] = useState(() => new Date());
    useEffect(() => {
      const id = setInterval(() => setT(new Date()), 1000);
      return () => clearInterval(id);
    }, []);
    return t;
  }
  const pad = (n) => String(n).padStart(2, "0");
  const fmtTime = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

  function useCountUp(target, dur = 1800) {
    const ref = React.useRef(null);
    const [n, setN] = useState(0);
    const startedRef = React.useRef(false);
    useEffect(() => {
      if (!ref.current) return;
      const el = ref.current;
      const begin = () => {
        if (startedRef.current) return;
        startedRef.current = true;
        let raf, start;
        const step = (t) => {
          if (!start) start = t;
          const p = Math.min(1, (t - start) / dur);
          const e = 1 - Math.pow(1 - p, 3);
          setN(Math.round(target * e));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      };
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) { begin(); return; }
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) begin(); });
      }, { threshold: 0.1 });
      io.observe(el);
      return () => io.disconnect();
    }, [target]);
    return [ref, n];
  }

  /* ============ SOC MISSION CARD ============ */
  function IndustrySOC({ k, code, kpi, kpiLabel, events, seed = 0 }) {
    const [tick, setTick] = useState(0);
    const now = useNow();
    const [numRef, num] = useCountUp(kpi);

    useEffect(() => {
      const id = setInterval(() => setTick((t) => t + 1), 2200 + (seed % 4) * 230);
      return () => clearInterval(id);
    }, [seed]);

    return (
      <div className="soc-card">
        <div className="soc-bg-grid" />
        <div className="soc-top">
          <span className="soc-code-pill">{code}</span>
          <span className="soc-live"><i />LIVE</span>
          <span className="soc-time">{fmtTime(now)}</span>
        </div>
        <div className="soc-mid">
          <div className="soc-kpi-wrap">
            <span ref={numRef} className="soc-num">{num.toLocaleString("bg-BG")}</span>
            <span className="soc-lbl">{kpiLabel}</span>
          </div>
          <div className="soc-bld">
            <Building3D k={k} />
          </div>
        </div>
        <div className="soc-log">
          {[0, 1, 2].map((i) => {
            const ev = events[(tick + i) % events.length];
            return (
              <div key={i} className={`soc-row ${i === 0 ? "on" : ""}`} style={{ opacity: 1 - i * 0.32 }}>
                <span className="soc-dot" />
                <span className="soc-ev">{ev}</span>
                <span className="soc-ts">{pad(((tick + i) * 7 + seed * 11) % 60)}s</span>
              </div>
            );
          })}
        </div>
        <div className="soc-sweep"><div /></div>
      </div>
    );
  }

  window.Building3D = Building3D;
  window.IndustrySOC = IndustrySOC;
})();
