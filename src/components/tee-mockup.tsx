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
  const seam = dark ? lighten(color, 0.12) : darken(color, 0.13);
  const fold = dark ? darken(color, 0.25) : darken(color, 0.08);
  const collar = dark ? lighten(color, 0.06) : darken(color, 0.06);
  const logo = dark ? lighten(color, 0.32) : darken(color, 0.3);
  const uid = `tee-${color.replace("#", "")}-${detailType}`;

  const body = "M196 116 C176 118 134 126 110 136 C82 148 62 204 52 240 C50 249 54 257 62 260 L114 280 C122 283 130 280 134 272 L146 240 L146 462 C146 476 154 485 168 486 C214 491 266 491 312 486 C326 485 334 476 334 462 L334 240 L346 272 C350 280 358 283 366 280 L418 260 C426 257 430 249 428 240 C418 204 398 148 370 136 C346 126 304 118 284 116 C276 138 204 138 196 116 Z";

  return (
    <svg viewBox="0 0 480 560" className={className} role="img" aria-label="Tee preview in selected color with embroidered detail on the chest and RST on the sleeve">
      <defs>
        <linearGradient id={`${uid}-shade`} x1="0" y1="0" x2=".9" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".18" />
          <stop offset=".5" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity=".12" />
        </linearGradient>
        <filter id={`${uid}-drop`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#272924" floodOpacity=".2" />
        </filter>
        <filter id={`${uid}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .05 0" />
        </filter>
        <clipPath id={`${uid}-clip`}><path d={body} /></clipPath>
      </defs>

      <g filter={`url(#${uid}-drop)`}>
        <path d={body} fill={color} />
        <path d={body} fill={`url(#${uid}-shade)`} />
        <rect width="480" height="560" clipPath={`url(#${uid}-clip)`} filter={`url(#${uid}-grain)`} />

        {/* gentle fabric folds */}
        <g fill="none" stroke={fold} strokeWidth="2" opacity=".22" strokeLinecap="round">
          <path d="M170 300 C204 310 244 312 272 304" />
          <path d="M178 376 C216 388 260 386 300 374" />
          <path d="M164 436 C200 448 252 448 298 438" />
          <path d="M126 164 C118 192 108 220 98 242" />
          <path d="M354 164 C362 192 372 220 382 242" />
        </g>

        {/* shoulder + side seams */}
        <g fill="none" stroke={seam} strokeWidth="1.5" opacity=".5">
          <path d="M112 138 C144 130 172 124 196 120" />
          <path d="M368 138 C336 130 308 124 284 120" />
          <path d="M146 240 L146 462" />
          <path d="M334 240 L334 462" />
        </g>

        {/* sleeve cuff + bottom hem double stitching */}
        <g fill="none" stroke={seam} strokeWidth="1.5" strokeDasharray="5 4" opacity=".6">
          <path d="M68 248 L122 268" />
          <path d="M72 238 L126 258" />
          <path d="M412 248 L358 268" />
          <path d="M408 238 L354 258" />
          <path d="M152 468 C214 478 266 478 328 468" />
          <path d="M152 458 C214 468 266 468 328 458" />
        </g>

        {/* collar */}
        <path d="M196 116 C204 138 276 138 284 116 C272 106 208 106 196 116 Z" fill={collar} />
        <path d="M196 116 C204 138 276 138 284 116" fill="none" stroke={seam} strokeWidth="1.7" opacity=".65" />
        <path d="M199 122 C208 142 272 142 281 122" fill="none" stroke={seam} strokeWidth="1.3" strokeDasharray="4 3" opacity=".55" />

        {/* baby shoulder snaps */}
        {snaps && (
          <g>
            {[300, 324, 348].map((x, i) => (
              <g key={x}>
                <circle cx={x} cy={124 + i * 4} r="6.5" fill={darken(color, 0.08)} stroke={seam} strokeWidth="1.4" />
                <circle cx={x} cy={124 + i * 4} r="2.4" fill="none" stroke={seam} strokeWidth="1.3" />
              </g>
            ))}
          </g>
        )}

        {/* signature neon detail — front chest, wearer's left */}
        <g transform="translate(282 188) scale(.55)">
          <Detail type={detailType} accent={accent} />
        </g>

        {/* RST embroidery — opposite sleeve, tone on tone */}
        <text x="92" y="232" transform="rotate(21 92 232)" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="14" letterSpacing="2.5" fill={logo}>RST</text>
      </g>
    </svg>
  );
}
