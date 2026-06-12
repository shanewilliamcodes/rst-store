import type { DetailType } from "@/lib/catalog";

function mix(hex: string, target: number, amount: number) {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16));
  return `#${channels.map((c) => Math.round(c + (target - c) * amount).toString(16).padStart(2, "0")).join("")}`;
}
const darken = (hex: string, amount: number) => mix(hex, 0, amount);
const lighten = (hex: string, amount: number) => mix(hex, 255, amount);
function isDark(hex: string) {
  const value = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.5;
}

function Detail({ type, accent }: { type: DetailType; accent: string }) {
  if (type === "heart") return <path d="M24 39S7 29 7 16.5C7 10.7 14.1 7.7 18 12c2.4-4.6 11.6-4.6 14 0 3.9-4.3 9.9-1.3 9.9 4.5C42 29 24 39 24 39Z" fill="none" stroke={accent} strokeWidth="4.5" strokeLinejoin="round" />;
  if (type === "mustache") return <path d="M24 27c-4-8-10-8-12-3-1.5-4-8-3-8 2 0 8 12 11 20 3 8 8 20 5 20-3 0-5-6.5-6-8-2-2-5-8-5-12 3Z" fill={accent} />;
  if (type === "bottle") return <path d="M19 7h10v6l4 5v20c0 2-2 4-4 4H19c-2 0-4-2-4-4V18l4-5V7Zm-1 17h12" fill="none" stroke={accent} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />;
  return (
    <g strokeLinejoin="round">
      <rect x="0" y="14" width="17" height="17" rx="2.5" fill="none" stroke="#b8ff2c" strokeWidth="3.5" />
      <rect x="15" y="6" width="17" height="17" rx="2.5" fill="none" stroke="#fff32b" strokeWidth="3.5" />
      <rect x="30" y="15" width="17" height="17" rx="2.5" fill="none" stroke="#ff3fa4" strokeWidth="3.5" />
    </g>
  );
}

export function TeeMockup({ color, accent, detailType, snaps = false, className = "" }: { color: string; accent: string; detailType: DetailType; snaps?: boolean; className?: string }) {
  const dark = isDark(color);
  const seam = dark ? lighten(color, 0.14) : darken(color, 0.16);
  const fold = dark ? darken(color, 0.28) : darken(color, 0.1);
  const collar = dark ? lighten(color, 0.07) : darken(color, 0.07);
  const logo = dark ? lighten(color, 0.34) : darken(color, 0.32);
  const uid = `tee-${color.replace("#", "")}-${detailType}`;

  const body = "M196 118 C172 120 118 130 92 142 C60 156 44 220 36 252 C34 261 38 268 46 272 L106 295 C114 298 122 295 126 287 L148 246 L150 468 C150 480 158 489 170 490 C216 495 264 495 310 490 C322 489 330 480 330 468 L332 246 L354 287 C358 295 366 298 374 295 L434 272 C442 268 446 261 444 252 C436 220 420 156 388 142 C362 130 308 120 284 118 C276 140 204 140 196 118 Z";

  return (
    <svg viewBox="0 0 480 560" className={className} role="img" aria-label={`Tee preview in selected color with embroidered detail on the chest and RST on the sleeve`}>
      <defs>
        <linearGradient id={`${uid}-shade`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".22" />
          <stop offset=".45" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity=".14" />
        </linearGradient>
        <filter id={`${uid}-drop`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#272924" floodOpacity=".22" />
        </filter>
      </defs>

      <g filter={`url(#${uid}-drop)`}>
        <path d={body} fill={color} />
        <path d={body} fill={`url(#${uid}-shade)`} />

        {/* gentle fabric folds */}
        <g fill="none" stroke={fold} strokeWidth="2" opacity=".3" strokeLinecap="round">
          <path d="M168 300 C200 312 240 314 268 306" />
          <path d="M176 380 C214 392 258 390 302 378" />
          <path d="M160 440 C198 452 250 452 300 442" />
          <path d="M120 168 C112 196 100 226 88 248" />
          <path d="M360 168 C368 196 380 226 392 248" />
        </g>

        {/* shoulder + side seams */}
        <g fill="none" stroke={seam} strokeWidth="1.6" opacity=".55">
          <path d="M96 144 C130 134 168 126 196 122" />
          <path d="M384 144 C350 134 312 126 284 122" />
          <path d="M148 246 L150 468" />
          <path d="M332 246 L330 468" />
        </g>

        {/* sleeve cuff + bottom hem double stitching */}
        <g fill="none" stroke={seam} strokeWidth="1.6" strokeDasharray="5 4" opacity=".7">
          <path d="M52 260 L116 284" />
          <path d="M56 250 L120 274" />
          <path d="M428 260 L364 284" />
          <path d="M424 250 L360 274" />
          <path d="M156 472 C216 482 264 482 324 472" />
          <path d="M156 462 C216 472 264 472 324 462" />
        </g>

        {/* collar */}
        <path d="M196 118 C204 140 276 140 284 118 C272 108 208 108 196 118 Z" fill={collar} />
        <path d="M196 118 C204 140 276 140 284 118" fill="none" stroke={seam} strokeWidth="1.8" opacity=".7" />
        <path d="M199 124 C208 144 272 144 281 124" fill="none" stroke={seam} strokeWidth="1.4" strokeDasharray="4 3" opacity=".6" />

        {/* baby shoulder snaps */}
        {snaps && (
          <g>
            {[306, 332, 358].map((x, i) => (
              <g key={x}>
                <circle cx={x} cy={134 + i * 3} r="7" fill={darken(color, 0.1)} stroke={seam} strokeWidth="1.5" />
                <circle cx={x} cy={134 + i * 3} r="2.6" fill="none" stroke={seam} strokeWidth="1.4" />
              </g>
            ))}
          </g>
        )}

        {/* signature neon detail — front chest, wearer's left */}
        <g transform="translate(286 196) scale(.62)">
          <Detail type={detailType} accent={accent} />
        </g>

        {/* RST embroidery — opposite sleeve, tone on tone */}
        <text x="84" y="246" transform="rotate(21 84 246)" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="15" letterSpacing="2.5" fill={logo}>RST</text>
      </g>
    </svg>
  );
}
