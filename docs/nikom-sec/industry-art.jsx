/* Animated isometric 3D scenes for the Industries grid.
   One distinct, security-themed scene per sector (k). Exposed as window.IndustryArt. */

(function () {
  const A = 0.866, B = 0.5; // iso projection (30°)
  function iso(x, y, z, o, s) { return [o.x + (x - y) * A * s, o.y + (x + y) * B * s - z * s]; }
  function poly(pts) { return pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' '); }

  // a 3D box; (x,y) = min corner of footprint, z = base height
  function Box({ x, y, z = 0, w, d, h, o, s, top = "var(--bg-elev)", front = "var(--bg-soft)", stroke = "var(--border-strong)", sw = 1.1, shade = 0.14 }) {
    const p = (X, Y, Z) => iso(x + X, y + Y, z + Z, o, s);
    const topPts = [p(0, 0, h), p(w, 0, h), p(w, d, h), p(0, d, h)];
    const frontPts = [p(0, d, 0), p(w, d, 0), p(w, d, h), p(0, d, h)];
    const sidePts = [p(w, 0, 0), p(w, d, 0), p(w, d, h), p(w, 0, h)];
    return (
      <g strokeLinejoin="round">
        <polygon points={poly(frontPts)} fill={front} stroke={stroke} strokeWidth={sw} />
        <polygon points={poly(sidePts)} fill={front} stroke={stroke} strokeWidth={sw} />
        <polygon points={poly(sidePts)} fill={`rgba(0,0,0,${shade})`} stroke="none" />
        <polygon points={poly(topPts)} fill={top} stroke={stroke} strokeWidth={sw} />
      </g>
    );
  }

  // window pane on the FRONT face (y = const = yf); u along x, v along z
  function fwin(x, yf, u0, u1, v0, v1, o, s) {
    return poly([iso(x + u0, yf, v0, o, s), iso(x + u1, yf, v0, o, s), iso(x + u1, yf, v1, o, s), iso(x + u0, yf, v1, o, s)]);
  }
  // window pane on the SIDE face (x = const = xf); u along y, v along z
  function swin(xf, y, u0, u1, v0, v1, o, s) {
    return poly([iso(xf, y + u0, v0, o, s), iso(xf, y + u1, v0, o, s), iso(xf, y + u1, v1, o, s), iso(xf, y + u0, v1, o, s)]);
  }

  const ACC = "var(--accent)";
  const GLASS = "rgba(95,168,255,0.5)";
  const RED = "#EB4D3D";

  function Shadow({ cx = 110, cy = 120, rx = 80, ry = 19 }) {
    return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="rgba(0,0,0,0.13)" />;
  }

  // small bullet CCTV camera at screen pt aiming toward (tx,ty), with sweeping cone
  function Cam({ cx, cy, tx, ty, len = 50, color = "#5AA8FF", scale = 1 }) {
    const ang = Math.atan2(ty - cy, tx - cx) * 180 / Math.PI;
    return (
      <g transform={`translate(${cx} ${cy}) rotate(${ang}) scale(${scale})`}>
        <line x1="-17" y1="-9" x2="-7" y2="0" stroke="var(--ink-700)" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="-17" cy="-10" r="2" fill="var(--ink-600)" />
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-7;7;-7" dur="5s"
            calcMode="spline" keyTimes="0;0.5;1" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" repeatCount="indefinite" />
          <polygon points={`13,0 ${len},${-len * 0.3} ${len},${len * 0.3}`} fill={color} opacity=".15">
            <animate attributeName="opacity" values=".06;.22;.06" dur="3.2s" repeatCount="indefinite" />
          </polygon>
          <line x1="13" y1="0" x2={len} y2="0" stroke={color} strokeWidth=".8" opacity=".4" strokeDasharray="2 3">
            <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1s" repeatCount="indefinite" />
          </line>
          <rect x="-9" y="-5.5" width="20" height="11" rx="5.5" fill="var(--ink-800)" stroke="var(--ink-600)" strokeWidth=".7" />
          <rect x="-7" y="-5.5" width="15" height="3" rx="1.5" fill="#fff" opacity=".16" />
          <rect x="2" y="-7.5" width="11" height="2.4" rx="1" fill="var(--ink-700)" />
          <circle cx="11" cy="0" r="4.6" fill="#0a0f16" stroke={color} strokeWidth="1" />
          <circle cx="9.4" cy="-1.3" r="1.2" fill="#BFE0FF" opacity=".85" />
        </g>
      </g>
    );
  }

  // wall alarm siren / strobe with radiating sound rings
  function Siren({ x, y, color = "#E0563E" }) {
    return (
      <g transform={`translate(${x} ${y})`}>
        {[0, 1, 2].map(i => (
          <circle key={i} cx="0" cy="0" r="4" fill="none" stroke={color} strokeWidth="1.2" opacity="0">
            <animate attributeName="r" values="4;14" dur="1.8s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values=".7;0" dur="1.8s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <rect x="-6" y="-5" width="9" height="10" rx="2" fill="var(--ink-700)" stroke="var(--ink-600)" strokeWidth=".6" />
        <circle cx="-1.5" cy="0" r="2.8" fill={color}>
          <animate attributeName="opacity" values="1;.2;1" dur="0.7s" repeatCount="indefinite" />
        </circle>
      </g>
    );
  }

  // boom barrier that raises and lowers
  function Barrier({ x, y, color = ACC, flip = 1 }) {
    return (
      <g transform={`translate(${x} ${y}) scale(${flip} 1)`}>
        <rect x="-3" y="-17" width="6" height="19" rx="1.5" fill="var(--ink-700)" stroke="var(--ink-600)" strokeWidth=".6" />
        <circle cx="0" cy="-15" r="2.6" fill="var(--ink-600)" />
        <g transform="translate(0 -15)">
          <animateTransform attributeName="transform" type="rotate" values="0;0;-72;-72;0" keyTimes="0;0.18;0.36;0.82;1" dur="5.5s" additive="sum" repeatCount="indefinite" />
          <rect x="0" y="-2" width="36" height="4" rx="2" fill="#fff" stroke="var(--ink-600)" strokeWidth=".6" />
          <rect x="4" y="-2" width="6" height="4" fill={color} />
          <rect x="16" y="-2" width="6" height="4" fill={color} />
          <rect x="28" y="-2" width="6" height="4" fill={color} />
        </g>
      </g>
    );
  }

  // ceiling fire / smoke detector with blink + periodic detection ring
  function FireDetector({ x, y }) {
    return (
      <g transform={`translate(${x} ${y})`}>
        <ellipse cx="0" cy="0" rx="6.5" ry="2.8" fill="var(--bg-elev)" stroke="var(--border-strong)" strokeWidth=".8" />
        <circle cx="0" cy="0" r="1.5" fill="#E0563E">
          <animate attributeName="opacity" values="1;.1;1" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="0" r="3" fill="none" stroke="#E0563E" strokeWidth="1" opacity="0">
          <animate attributeName="r" values="3;15" dur="6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0;.7;0" keyTimes="0;0.6;0.68;1" dur="6s" repeatCount="indefinite" />
        </circle>
      </g>
    );
  }

  // access-control card reader with tap pulse
  function AccessPad({ x, y, color = "#3FBF6E" }) {
    return (
      <g transform={`translate(${x} ${y})`}>
        <rect x="-3.2" y="-6.5" width="7" height="13" rx="1.8" fill="var(--ink-800)" stroke="var(--ink-600)" strokeWidth=".6" />
        <rect x="-1.7" y="-4.6" width="3.6" height="3.6" rx=".8" fill={color}>
          <animate attributeName="fill" values="#1d5a35;#5ff0a0;#1d5a35" dur="1.8s" repeatCount="indefinite" />
        </rect>
        <circle cx="0" cy="-1" r="8" fill="none" stroke={color} strokeWidth="1" opacity="0">
          <animate attributeName="r" values="2;11" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values=".7;0" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </g>
    );
  }

  // PIR motion sensor with a detection cone
  function MotionSensor({ x, y, dir = 1 }) {
    return (
      <g transform={`translate(${x} ${y})`}>
        <polygon points={`0,0 ${24 * dir},-10 ${24 * dir},10`} fill="#9DE2C6">
          <animate attributeName="opacity" values=".05;.24;.05" dur="2.4s" repeatCount="indefinite" />
        </polygon>
        <rect x="-3" y="-4.5" width="6" height="9" rx="3" fill="var(--ink-700)" stroke="var(--ink-600)" strokeWidth=".6" />
        <circle cx="0" cy="0" r="1.4" fill="#3FBF6E">
          <animate attributeName="opacity" values=".4;1;.4" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </g>
    );
  }

  function Scene({ children, float = true }) {
    return (
      <g>
        {float ? (
          <g>
            <animateTransform attributeName="transform" type="translate" additive="sum"
              values="0 0; 0 -2.5; 0 0" dur="6s" calcMode="spline" keyTimes="0;0.5;1"
              keySplines="0.4 0 0.2 1;0.4 0 0.2 1" repeatCount="indefinite" />
            {children}
          </g>
        ) : children}
      </g>
    );
  }

  /* ---------- HOSPITAL ---------- */
  function Hospital() {
    const o = { x: 108, y: 97 }, s = 4.2;
    return (
      <Scene>
        <Shadow cx={108} cy={122} rx={80} />
        {/* low wing */}
        <Box x={-11} y={-4} w={6} d={9} h={6} o={o} s={s} />
        {/* main block */}
        <Box x={-5} y={-6} w={10} d={11} h={11} o={o} s={s} />
        {/* window rows on front face (y=5) */}
        {[0, 1, 2].map(r => [0, 1, 2].map(c => (
          <polygon key={r + '-' + c} points={fwin(-5, 5, 1.4 + c * 2.6, 2.9 + c * 2.6, 1.6 + r * 3, 3.4 + r * 3, o, s)} fill={GLASS} opacity=".55" />
        )))}
        {/* entrance canopy */}
        <Box x={-3} y={5} w={6} d={2.2} h={2.6} o={o} s={s} top="var(--accent)" front="var(--accent)" shade={0.18} />
        {/* rooftop medical cross sign */}
        {(() => { const c = iso(0, -0.5, 11.4, o, s); return (
          <g transform={`translate(${c[0]} ${c[1]})`}>
            <rect x="-9" y="-13" width="18" height="13" rx="2" fill="var(--bg-elev)" stroke="var(--border-strong)" strokeWidth="1" />
            <g fill={RED}>
              <rect x="-2.4" y="-11" width="4.8" height="9" rx="1" />
              <rect x="-6.5" y="-7.1" width="13" height="4.8" rx="1" />
              <animate attributeName="opacity" values=".5;1;.5" dur="1.8s" repeatCount="indefinite" />
            </g>
          </g>
        ); })()}
        <Cam cx={o.x - 46} cy={o.y + 6} tx={o.x - 6} ty={o.y + 34} len={46} />
        <FireDetector x={o.x - 18} y={o.y - 6} />
        <Siren x={o.x + 30} y={o.y - 2} />
        <Barrier x={o.x + 40} y={120} flip={1} />
      </Scene>
    );
  }

  /* ---------- RETAIL ---------- */
  function Retail() {
    const o = { x: 110, y: 84 }, s = 4.5;
    return (
      <Scene>
        <Shadow cx={110} cy={122} rx={86} />
        {/* wide storefront */}
        <Box x={-10} y={-6} w={20} d={11} h={7} o={o} s={s} />
        {/* signage band (accent) across front top */}
        <polygon points={fwin(-10, 5, 0.6, 19.4, 5.4, 6.6, o, s)} fill={ACC} />
        {/* big display windows */}
        {[0, 1, 2, 3].map(c => (
          <polygon key={c} points={fwin(-10, 5, 1 + c * 4.7, 4.4 + c * 4.7, 0.6, 4.6, o, s)} fill={GLASS} opacity=".55" />
        ))}
        {/* EAS anti-theft gates at the doorway + pulsing beam */}
        {(() => {
          const g1 = iso(-1.4, 5, 0, o, s), g2 = iso(1.4, 5, 0, o, s);
          const g1t = iso(-1.4, 5, 3.4, o, s), g2t = iso(1.4, 5, 3.4, o, s);
          return (
            <g>
              <line x1={g1[0]} y1={g1[1]} x2={g1t[0]} y2={g1t[1]} stroke="var(--ink-700)" strokeWidth="3" strokeLinecap="round" />
              <line x1={g2[0]} y1={g2[1]} x2={g2t[0]} y2={g2t[1]} stroke="var(--ink-700)" strokeWidth="3" strokeLinecap="round" />
              <line x1={(g1[0] + g1t[0]) / 2} y1={(g1[1] + g1t[1]) / 2} x2={(g2[0] + g2t[0]) / 2} y2={(g2[1] + g2t[1]) / 2} stroke={ACC} strokeWidth="1.4">
                <animate attributeName="opacity" values=".2;1;.2" dur="1.6s" repeatCount="indefinite" />
              </line>
            </g>
          );
        })()}
        {/* floating shopping bag */}
        {(() => { const c = iso(7, -3, 9, o, s); return (
          <g transform={`translate(${c[0]} ${c[1]})`} stroke="var(--border-strong)" strokeWidth="1" strokeLinejoin="round">
            <animateTransform attributeName="transform" type="translate" additive="sum" values="0 0;0 -3;0 0" dur="4s" repeatCount="indefinite" />
            <path d="M-6 -4 H6 L7 9 H-7 Z" fill="var(--bg-elev)" />
            <path d="M-3 -4 V-6 a3 3 0 0 1 6 0 V-4" fill="none" stroke={ACC} strokeWidth="1.4" />
          </g>
        ); })()}
        <Cam cx={o.x - 4} cy={o.y - 30} tx={o.x} ty={o.y + 4} len={42} />
        <Siren x={o.x + 56} y={o.y - 30} />
        <AccessPad x={o.x - 70} y={o.y + 16} />
      </Scene>
    );
  }

  /* ---------- HOTEL / RESIDENTIAL ---------- */
  function Hotel() {
    const o = { x: 110, y: 95 }, s = 4.2;
    return (
      <Scene>
        <Shadow cx={110} cy={122} rx={72} />
        {/* podium */}
        <Box x={-8} y={-5} w={15} d={10} h={3.5} o={o} s={s} />
        {/* slender tower */}
        <Box x={-4} y={-4} w={8} d={8} h={15} o={o} s={s} />
        {/* balcony window rows (front) */}
        {[0, 1, 2, 3, 4].map(r => [0, 1].map(c => (
          <polygon key={r + '-' + c} points={fwin(-4, 4, 1.2 + c * 3.6, 3.4 + c * 3.6, 4.6 + r * 3, 6.6 + r * 3, o, s)}
            fill={r === 2 && c === 1 ? ACC : GLASS} opacity={r === 2 && c === 1 ? 0.95 : 0.5}>
            {r === 2 && c === 1 && <animate attributeName="opacity" values=".4;1;.4" dur="2.4s" repeatCount="indefinite" />}
          </polygon>
        )))}
        {/* rooftop star */}
        {(() => { const c = iso(0, 0, 15.6, o, s); return (
          <g transform={`translate(${c[0]} ${c[1] - 6})`}>
            <path d="M0 -9 L2.5 -3 L9 -3 L3.8 1 L5.8 7.5 L0 3.5 L-5.8 7.5 L-3.8 1 L-9 -3 L-2.5 -3 Z" fill={ACC} stroke="var(--accent-strong)" strokeWidth=".6">
              <animate attributeName="opacity" values=".6;1;.6" dur="2.6s" repeatCount="indefinite" />
            </path>
          </g>
        ); })()}
        {/* keycard reader at entrance — green tap pulse */}
        {(() => { const c = iso(5.5, 5, 1.6, o, s); return (
          <g transform={`translate(${c[0]} ${c[1]})`}>
            <rect x="-3" y="-5" width="6" height="10" rx="1.5" fill="var(--ink-800)" />
            <rect x="-1.6" y="-3.4" width="3.2" height="3.2" rx=".6" fill="#3FBF6E">
              <animate attributeName="fill" values="#1d5a35;#5ff0a0;#1d5a35" dur="1.8s" repeatCount="indefinite" />
            </rect>
            <circle r="9" fill="none" stroke="#3FBF6E" strokeWidth="1">
              <animate attributeName="r" values="3;13;3" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values=".7;0;.7" dur="2.4s" repeatCount="indefinite" />
            </circle>
          </g>
        ); })()}
        <Cam cx={o.x - 36} cy={o.y + 2} tx={o.x} ty={o.y + 20} len={40} />
        <FireDetector x={o.x - 16} y={o.y - 8} />
        <Barrier x={o.x + 40} y={120} flip={1} />
      </Scene>
    );
  }

  /* ---------- INDUSTRIAL / WAREHOUSE ---------- */
  function Industrial() {
    const o = { x: 104, y: 79 }, s = 4.2;
    return (
      <Scene>
        <Shadow cx={106} cy={122} rx={88} />
        {/* large shed */}
        <Box x={-11} y={-7} w={19} d={13} h={6} o={o} s={s} />
        {/* roller door */}
        <polygon points={fwin(-11, 6, 12, 18, 0.4, 5, o, s)} fill="var(--ink-700)" opacity=".35" />
        {[0, 1, 2, 3].map(r => (
          <polygon key={r} points={fwin(-11, 6, 12, 18, 1 + r * 1.05, 1.55 + r * 1.05, o, s)} fill="var(--bg-soft)" opacity=".5" />
        ))}
        {/* container beside */}
        <Box x={9.5} y={-4} w={4} d={9} h={4} o={o} s={s} top={ACC} front={ACC} shade={0.22} />
        {/* perimeter fence posts (front-left) + sweeping motion beam */}
        {(() => {
          const f0 = iso(-11, 8.5, 0, o, s), f1 = iso(8, 8.5, 0, o, s);
          const ft = iso(-11, 8.5, 2.6, o, s);
          return (
            <g>
              <line x1={f0[0]} y1={f0[1]} x2={f1[0]} y2={f1[1] + (iso(8, 8.5, 0, o, s)[1] - f0[1])} stroke="var(--ink-700)" strokeWidth="1" opacity=".5" strokeDasharray="2 3" />
              <line x1={f0[0]} y1={f0[1]} x2={ft[0]} y2={ft[1]} stroke="var(--ink-700)" strokeWidth="1.4" />
              {/* radar sweep */}
              {(() => { const c = iso(-11, 8.5, 2.6, o, s); return (
                <g transform={`translate(${c[0]} ${c[1]})`}>
                  <circle r="2" fill={ACC} />
                  <g>
                    <animateTransform attributeName="transform" type="rotate" values="20;120;20" dur="3.4s"
                      calcMode="spline" keyTimes="0;0.5;1" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" repeatCount="indefinite" />
                    <polygon points="0,0 44,-9 44,9" fill={ACC} opacity=".16" />
                    <line x1="0" y1="0" x2="44" y2="0" stroke={ACC} strokeWidth=".8" opacity=".5" />
                  </g>
                </g>
              ); })()}
            </g>
          );
        })()}
        <Cam cx={o.x - 56} cy={o.y - 16} tx={o.x} ty={o.y + 6} len={48} />
        <Siren x={o.x + 70} y={o.y - 14} />
        <Barrier x={o.x - 70} y={120} flip={1} />
      </Scene>
    );
  }

  /* ---------- OFFICE TOWER ---------- */
  function Office() {
    const o = { x: 110, y: 98 }, s = 4.0;
    return (
      <Scene>
        <Shadow cx={110} cy={122} rx={72} />
        <Box x={-7} y={-5} w={13} d={9} h={3} o={o} s={s} />
        {/* glass tower */}
        <Box x={-4.5} y={-4} w={9} d={8} h={16} o={o} s={s} top="rgba(95,168,255,0.28)" front="rgba(95,168,255,0.18)" />
        {/* setback crown */}
        <Box x={-2.5} y={-2} w={5} d={5} h={2.4} o={o} s={s} top="var(--bg-elev)" />
        {/* window grid on front face — animated light ripple */}
        {[0, 1, 2, 3, 4].map(r => [0, 1, 2].map(c => {
          const lit = (r + c) % 3 === 0;
          return (
            <polygon key={r + '-' + c} points={fwin(-4.5, 4, 0.8 + c * 2.9, 2.6 + c * 2.9, 3.6 + r * 2.4, 5.2 + r * 2.4, o, s)}
              fill={lit ? ACC : GLASS} opacity={lit ? 0.9 : 0.4}>
              {lit && <animate attributeName="opacity" values=".25;.95;.25" dur="3s" begin={`${(r + c) * 0.25}s`} repeatCount="indefinite" />}
            </polygon>
          );
        }))}
        {/* lobby turnstiles + access pulse */}
        {(() => { const c = iso(0, 4, 0, o, s); return (
          <g transform={`translate(${c[0]} ${c[1]})`}>
            {[-6, 0, 6].map((dx, i) => <rect key={i} x={dx - 1.3} y="-7" width="2.6" height="7" rx="1" fill="var(--ink-700)" />)}
            <rect x="-9" y="-2" width="18" height="2" fill={ACC} opacity=".8">
              <animate attributeName="opacity" values=".25;.9;.25" dur="1.8s" repeatCount="indefinite" />
            </rect>
          </g>
        ); })()}
        <Cam cx={o.x - 40} cy={o.y - 4} tx={o.x} ty={o.y + 20} len={40} />
        <AccessPad x={o.x + 34} y={o.y + 16} />
        <FireDetector x={o.x - 14} y={o.y - 12} />
      </Scene>
    );
  }

  /* ---------- GOVERNMENT / INSTITUTIONAL ---------- */
  function Government() {
    const o = { x: 108, y: 86 }, s = 4.6;
    const cols = [-7.5, -4.5, -1.5, 1.5, 4.5];
    return (
      <Scene>
        <Shadow cx={108} cy={122} rx={84} />
        {/* stepped base */}
        <Box x={-11} y={-7} w={19} d={13} h={2} o={o} s={s} />
        {/* main hall */}
        <Box x={-9} y={-5} w={15} d={10} h={7} o={o} s={s} />
        {/* colonnade — columns on front face */}
        {cols.map((cx, i) => (
          <polygon key={i} points={fwin(0, 5, cx + 8, cx + 9.4, 0.4, 6.4, o, s)} fill="var(--bg-elev)" stroke="var(--border-strong)" strokeWidth=".8" />
        ))}
        {/* pediment (triangular roof) */}
        {(() => {
          const l = iso(-9, 5, 7, o, s), r = iso(6, 5, 7, o, s), apex = iso(-1.5, 5, 11, o, s);
          const lb = iso(-9, -5, 7, o, s), apb = iso(-1.5, -5, 11, o, s);
          return (
            <g strokeLinejoin="round" stroke="var(--border-strong)" strokeWidth="1">
              <polygon points={poly([lb, apb, apex, l])} fill="var(--bg-soft)" />
              <polygon points={poly([l, apex, r])} fill="var(--bg-elev)" />
            </g>
          );
        })()}
        {/* glowing shield emblem in the pediment */}
        {(() => { const c = iso(-1.5, 5, 8.4, o, s); return (
          <g transform={`translate(${c[0]} ${c[1]})`}>
            <path d="M0 -6 L5 -3.5 V0 C5 3.6 2.8 6 0 7 C-2.8 6 -5 3.6 -5 0 V-3.5 Z" fill={ACC} stroke="var(--accent-strong)" strokeWidth=".6">
              <animate attributeName="opacity" values=".55;1;.55" dur="2.2s" repeatCount="indefinite" />
            </path>
          </g>
        ); })()}
        {/* flag pole + waving flag */}
        {(() => { const base = iso(6.5, 0, 7, o, s); return (
          <g transform={`translate(${base[0]} ${base[1]})`}>
            <line x1="0" y1="0" x2="0" y2="-26" stroke="var(--ink-700)" strokeWidth="1.4" />
            <path d="M0 -25 Q7 -23 14 -25 Q7 -27 14 -29 Q7 -27 0 -19 Z" fill={ACC}>
              <animate attributeName="d"
                values="M0 -25 Q7 -23 14 -25 Q7 -27 14 -29 Q7 -27 0 -19 Z;
                        M0 -25 Q7 -27 14 -25 Q7 -23 14 -29 Q7 -25 0 -19 Z;
                        M0 -25 Q7 -23 14 -25 Q7 -27 14 -29 Q7 -27 0 -19 Z"
                dur="2.6s" repeatCount="indefinite" />
            </path>
          </g>
        ); })()}
        <Cam cx={o.x - 48} cy={o.y + 2} tx={o.x - 8} ty={o.y + 28} len={44} />
        <Siren x={o.x - 28} y={o.y - 16} />
        <Barrier x={o.x + 46} y={120} flip={1} />
      </Scene>
    );
  }

  const MAP = { hospital: Hospital, retail: Retail, hotel: Hotel, ind: Industrial, office: Office, gov: Government };

  function IndustryArt({ k }) {
    const C = MAP[k] || Office;
    return (
      <svg viewBox="0 0 220 140" className="ind-art" preserveAspectRatio="xMidYMid meet">
        <C />
      </svg>
    );
  }

  window.IndustryArt = IndustryArt;
})();
