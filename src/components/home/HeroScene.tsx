import Image from "next/image";

const sparks = [
  { left: "6%", size: 6, dur: "13s", delay: "0s", dx: "40px" },
  { left: "14%", size: 4, dur: "10s", delay: "2s", dx: "-30px" },
  { left: "23%", size: 7, dur: "15s", delay: "5s", dx: "60px" },
  { left: "31%", size: 4, dur: "11s", delay: "1s", dx: "-20px" },
  { left: "42%", size: 5, dur: "14s", delay: "7s", dx: "30px" },
  { left: "51%", size: 3, dur: "9s", delay: "3s", dx: "-50px" },
  { left: "60%", size: 6, dur: "16s", delay: "6s", dx: "40px" },
  { left: "68%", size: 4, dur: "12s", delay: "0.5s", dx: "-35px" },
  { left: "76%", size: 5, dur: "13s", delay: "4s", dx: "25px" },
  { left: "84%", size: 7, dur: "17s", delay: "8s", dx: "-60px" },
  { left: "91%", size: 4, dur: "10s", delay: "2.5s", dx: "20px" },
  { left: "97%", size: 5, dur: "14s", delay: "9s", dx: "-25px" },
];

/** Layered, moving hero backdrop: slow camera move, light beams, sparks and a tow truck driving by. */
export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" data-parallax aria-hidden>
      <div className="absolute -inset-6" data-depth="14">
        <div className="kenburns absolute inset-0">
          <Image
            src="/images/hero/hero.webp"
            alt=""
            fill
            priority
            fetchPriority="high"
            quality={50}
            className="object-cover opacity-70"
            sizes="100vw"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/30" />

      <div className="absolute inset-y-0 left-0 w-1/3" style={{ animationDelay: "1s" }}>
        <div className="beam h-full w-full bg-gradient-to-r from-transparent via-brand/25 to-transparent" />
      </div>

      <div className="absolute inset-0" data-depth="30">
        {sparks.map((s, i) => (
          <span
            key={i}
            className="spark"
            style={{
              left: s.left,
              width: s.size,
              height: s.size,
              ["--dur" as string]: s.dur,
              ["--delay" as string]: s.delay,
              ["--dx" as string]: s.dx,
            }}
          />
        ))}
      </div>

      <div className="truck-lane">
        <div className="truck">
          <TowTruck />
        </div>
      </div>
    </div>
  );
}

export function TowTruck() {
  return (
    <svg viewBox="0 0 360 130" role="presentation" focusable="false">
      {/* flatbed + chassis */}
      <rect x="18" y="82" width="238" height="10" rx="2" fill="#2b303b" />
      <path d="M14 78 L250 78 L250 84 L14 84 Z" fill="#454c5a" />
      {/* loaded car */}
      <g>
        <path
          d="M52 76 C58 58 76 52 102 50 L142 48 C158 40 176 38 190 40 C204 42 214 52 222 62 L236 66 C242 68 244 72 244 76 Z"
          fill="#38bdf8"
        />
        <path d="M110 52 L140 49 C150 44 164 43 176 44 L184 58 L108 60 Z" fill="#0b1220" opacity="0.88" />
        <path d="M186 45 C196 47 204 55 210 62 L190 62 Z" fill="#0b1220" opacity="0.88" />
        <rect x="236" y="68" width="8" height="5" rx="1.5" fill="#e0f2fe" />
        <circle cx="90" cy="76" r="13" fill="#0f172a" />
        <g className="wheel">
          <circle cx="90" cy="76" r="8" fill="#9aa1ad" />
          <path d="M90 69 V83 M83 76 H97" stroke="#0f172a" strokeWidth="2" />
        </g>
        <circle cx="204" cy="76" r="13" fill="#0f172a" />
        <g className="wheel">
          <circle cx="204" cy="76" r="8" fill="#9aa1ad" />
          <path d="M204 69 V83 M197 76 H211" stroke="#0f172a" strokeWidth="2" />
        </g>
      </g>
      {/* cab */}
      <path
        d="M256 94 L256 56 C256 50 260 46 266 46 L296 46 C302 46 306 49 310 54 L326 74 C329 78 330 80 330 84 L330 94 Z"
        fill="#f4f5f7"
      />
      <path d="M268 52 L296 52 C299 52 301 53 303 56 L316 74 L268 74 Z" fill="#0b1220" opacity="0.9" />
      <rect x="256" y="84" width="74" height="8" fill="#38bdf8" />
      <rect x="322" y="82" width="9" height="6" rx="2" fill="#e0f2fe" />
      {/* beacon */}
      <rect x="276" y="40" width="14" height="6" rx="2" fill="#2b303b" />
      <circle className="beacon" cx="283" cy="37" r="5" fill="#a5b4fc" />
      {/* chassis + wheels */}
      <rect x="18" y="92" width="312" height="10" rx="3" fill="#1b1f27" />
      {[56, 92, 292].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="104" r="17" fill="#0f172a" />
          <g className="wheel">
            <circle cx={cx} cy="104" r="10" fill="#c3c8d1" />
            <path
              d={`M${cx} 95 V113 M${cx - 9} 104 H${cx + 9} M${cx - 6.4} 97.6 L${cx + 6.4} 110.4 M${cx + 6.4} 97.6 L${cx - 6.4} 110.4`}
              stroke="#0f172a"
              strokeWidth="1.6"
            />
            <circle cx={cx} cy="104" r="2.6" fill="#0f172a" />
          </g>
        </g>
      ))}
    </svg>
  );
}
