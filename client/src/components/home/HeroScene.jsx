import { useEffect, useRef, useState } from 'react';
import logo from '../../assets/logo.png';

/* The beam is a fan of rays. `tilt` rotates each one about the landing
   point, `w` is its width at the top as a % of the beam frame. Widest and
   softest first so the bright hairlines paint over them. */
const BEAM_RAYS = [
  { variant: 'soft', tilt: '0deg', w: '215%', blur: '48px', opacity: 0.4, pulse: '9s' },
  { variant: 'soft', tilt: '-4.5deg', w: '95%', blur: '30px', opacity: 0.34, pulse: '7.4s' },
  { variant: 'soft', tilt: '5deg', w: '85%', blur: '30px', opacity: 0.3, pulse: '8.2s' },

  { tilt: '-13deg', w: '15%', blur: '10px', opacity: 0.24, pulse: '9.4s', flow: '5.6s', delay: '-0.9s' },
  { tilt: '-9.5deg', w: '26%', blur: '9px', opacity: 0.38, pulse: '6.8s', flow: '4.6s', delay: '-2.1s' },
  { tilt: '-6deg', w: '34%', blur: '8px', opacity: 0.55, pulse: '5.4s', flow: '3.8s', delay: '-0.7s' },
  { tilt: '-2.5deg', w: '42%', blur: '7px', opacity: 0.78, pulse: '4.6s', flow: '3.1s', delay: '-1.6s' },
  { tilt: '1.5deg', w: '44%', blur: '7px', opacity: 0.82, pulse: '4.2s', flow: '2.9s', delay: '-0.3s' },
  { tilt: '4.5deg', w: '32%', blur: '8px', opacity: 0.58, pulse: '5.9s', flow: '3.6s', delay: '-2.4s' },
  { tilt: '8.5deg', w: '24%', blur: '9px', opacity: 0.4, pulse: '7.1s', flow: '4.3s', delay: '-1.2s' },
  { tilt: '12deg', w: '16%', blur: '10px', opacity: 0.26, pulse: '8.6s', flow: '5.2s', delay: '-3.1s' },

  { tilt: '-1deg', w: '9%', blur: '3px', opacity: 0.85, pulse: '3.4s', flow: '2.2s', delay: '0s' },
  { tilt: '2.5deg', w: '7%', blur: '3px', opacity: 0.7, pulse: '3.9s', flow: '2.6s', delay: '-1.1s' },
  { variant: 'core', tilt: '0deg', w: '5%', blur: '1.5px', opacity: 1, pulse: '2.8s', flow: '1.6s', delay: '0s' },
];

/* Lightning tendrils. Drawn in a 100x1000 box that stretches over the beam,
   spread across the top and converging on x=50 at the landing point. */
const BOLTS = [
  'M31 0 L37 118 L32 248 L40 378 L37 498 L44 618 L42 740 L47 858 L50 1000',
  'M70 0 L64 130 L69 258 L61 388 L64 508 L57 638 L59 758 L53 878 L50 1000',
  'M50 0 L45 140 L54 278 L46 418 L53 558 L47 698 L52 838 L50 1000',
];

/* Faint orbital arcs with a glowing body travelling along each one. */
const ORBITS = [
  {
    size: 'min(158vmin, 1560px)',
    x: '53%',
    y: '46%',
    duration: '72s',
    delay: '-12s',
    dot: '#c084fc',
    fade: 'linear-gradient(205deg, #000 0%, rgba(0,0,0,0.45) 42%, transparent 70%)',
  },
  {
    size: 'min(118vmin, 1180px)',
    x: '48%',
    y: '48%',
    duration: '48s',
    delay: '-30s',
    dot: '#f472b6',
    fade: 'linear-gradient(35deg, #000 0%, rgba(0,0,0,0.35) 38%, transparent 66%)',
  },
  {
    size: 'min(86vmin, 900px)',
    x: '44%',
    y: '52%',
    duration: '34s',
    delay: '-6s',
    dot: '#a855f7',
    fade: 'linear-gradient(150deg, #000 0%, rgba(0,0,0,0.3) 36%, transparent 62%)',
  },
];

/* The planet is a circle and the horizon is a curve stretched across the
   full width, so where they cross depends on the viewport. Solving it in
   pixels at the measured hero size is the only way to keep the planet
   circular *and* have the light hand off cleanly — the two shapes cannot
   share one stretched viewBox without the circle becoming an ellipse.
   Mirrors .cosmic-planet and .cosmic-horizon in index.css. */
const buildTrace = (w, h) => {
  if (!w || !h) return null;

  /* .cosmic-planet: --planet-size across. The +100 fixes the top of the
     circle — where the two runs of light split — 100px below the top of the
     hero, whatever the planet's size; it is tuned to sit just under the navbar
     (~96px) and keep the arc off the hero copy. On tall narrow screens the 62%
     floor wins instead, because there the circle is small and has to stay low
     enough to still reach the horizon at all.
     Keep in step with `top` on .cosmic-planet in index.css. */
  const radius = (Math.min(1.15 * Math.min(w, h), 1280) + 355) / 2;
  const cx = w / 2;
  const cy = Math.max(radius + 100, 0.62 * h);

  /* The horizon's quadratic, converted out of the horizon SVG's viewBox
     ("M -120 176 Q 720 44 1560 176" in 1440x460, drawn across the bottom
     42% of the hero) and into hero pixels. */
  const p0 = { x: -0.083333 * w, y: 0.740696 * h };
  const p1 = { x: 0.5 * w, y: 0.620174 * h };
  const p2 = { x: 1.083333 * w, y: 0.740696 * h };

  const at = (t) => {
    const u = 1 - t;
    return {
      x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
      y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
    };
  };

  // Signed distance from the circle: negative inside, positive outside
  const gap = (t) => {
    const { x, y } = at(t);
    return (x - cx) ** 2 + (y - cy) ** 2 - radius * radius;
  };

  /* Bisect for where the horizon leaves the circle. The search runs past
     t=1 — on narrow screens the circle is wide enough to swallow the whole
     visible horizon, and extrapolating the curve past the frame edge finds
     the crossing anyway. tHit > 1 simply means the handoff happens
     off-screen, which route() handles by dropping the horizon leg. */
  if (gap(0.5) > 0 || gap(2) < 0) return null;

  let lo = 0.5;
  let hi = 2;
  for (let i = 0; i < 44; i += 1) {
    const mid = (lo + hi) / 2;
    if (gap(mid) < 0) lo = mid;
    else hi = mid;
  }
  const tHit = (lo + hi) / 2;

  // Exact control point for the slice of the quadratic between t1 and t2
  const controlBetween = (t1, t2) => {
    const w0 = (1 - t1) * (1 - t2);
    const w1 = t1 * (1 - t2) + t2 * (1 - t1);
    const w2 = t1 * t2;
    return {
      x: w0 * p0.x + w1 * p1.x + w2 * p2.x,
      y: w0 * p0.y + w1 * p1.y + w2 * p2.y,
    };
  };

  const r1 = (n) => Math.round(n * 10) / 10;

  /* Down one side of the circle from its top, then outwards along the
     horizon to the edge of the frame. sweep 1 = right, 0 = left. Each run is
     tagged so it can be tinted to match its half of the horizon. */
  const route = (sweep, side) => {
    const tCross = sweep ? tHit : 1 - tHit;
    // Clamped so the horizon leg never doubles back when the crossing
    // already sits beyond the edge of the frame
    const tEdge = sweep ? Math.max(tHit, 1) : Math.min(1 - tHit, 0);
    const cross = at(tCross);
    const edge = at(tEdge);
    const ctrl = controlBetween(tCross, tEdge);

    return {
      side,
      d: [
        `M ${r1(cx)} ${r1(cy - radius)}`,
        `A ${r1(radius)} ${r1(radius)} 0 0 ${sweep} ${r1(cross.x)} ${r1(cross.y)}`,
        `Q ${r1(ctrl.x)} ${r1(ctrl.y)} ${r1(edge.x)} ${r1(edge.y)}`,
      ].join(' '),
    };
  };

  return { cx, cy, radius, routes: [route(1, 'right'), route(0, 'left')] };
};

/**
 * The hero's foreground scene: the planet arc, the beam of rays, the horizon
 * and the floating sigil.
 *
 * Deliberately hero-only. The ambient half of the artwork — nebula, drifting
 * clouds, stars, grain — lives in <CosmicBackground>, which is fixed behind
 * the whole site. This piece is composed for one viewport-height frame and
 * would read as clutter behind a long scrolling page.
 */
const HeroScene = () => {
  const rootRef = useRef(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  // The rim light is solved in pixels, so it needs the measured frame.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return undefined;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      setBox((prev) =>
        prev.w === rect.width && prev.h === rect.height ? prev : { w: rect.width, h: rect.height },
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const trace = buildTrace(box.w, box.h);

  return (
    <div className="hero-scene" ref={rootRef} aria-hidden="true">
      {/* Rays falling from above, converging on the centre of the arc */}
      <div className="cosmic-beam">
        {BEAM_RAYS.map((ray) => (
          <div
            key={`${ray.tilt}-${ray.w}`}
            className={`cosmic-ray${ray.variant ? ` cosmic-ray--${ray.variant}` : ''}`}
            style={{
              '--tilt': ray.tilt,
              '--w': ray.w,
              '--blur': ray.blur,
              '--o': ray.opacity,
              '--pulse': ray.pulse,
            }}
          >
            <div className="cosmic-ray__body">
              {ray.flow && (
                <div
                  className="cosmic-ray__flow"
                  style={{ animationDuration: ray.flow, animationDelay: ray.delay }}
                />
              )}
            </div>
          </div>
        ))}

        <svg
          className="cosmic-beam__bolt"
          viewBox="0 0 100 1000"
          preserveAspectRatio="none"
          focusable="false"
        >
          {BOLTS.map((d) => (
            <path key={d} d={d} vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
      </div>

      {/* Orbital arcs with travelling bodies */}
      {ORBITS.map((orbit) => (
        <div
          key={orbit.size}
          className="cosmic-orbit"
          style={{ width: orbit.size, height: orbit.size, left: orbit.x, top: orbit.y }}
        >
          <div
            className="cosmic-orbit__ring"
            style={{ WebkitMaskImage: orbit.fade, maskImage: orbit.fade }}
          />
          <div
            className="cosmic-orbit__spinner"
            style={{ animationDuration: orbit.duration, animationDelay: orbit.delay }}
          >
            <span
              className="cosmic-orbit__dot"
              style={{ background: orbit.dot, boxShadow: `0 0 12px 3px ${orbit.dot}` }}
            />
          </div>
        </div>
      ))}

      {/* The planet */}
      <div className="cosmic-planet" />

      {/* Keeps hero copy readable — sits under the horizon and the sigil */}
      <div className="cosmic-scrim" />

      {/* Horizon + planet surface */}
      <svg
        className="cosmic-horizon"
        viewBox="0 0 1440 460"
        preserveAspectRatio="none"
        focusable="false"
      >
        <defs>
          <linearGradient id="cosmicHorizonLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="14%" stopColor="#a855f7" stopOpacity="0.65" />
            <stop offset="36%" stopColor="#ec4899" stopOpacity="1" />
            <stop offset="55%" stopColor="#fb7185" stopOpacity="1" />
            <stop offset="72%" stopColor="#fb923c" stopOpacity="0.95" />
            <stop offset="88%" stopColor="#f97316" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="cosmicSurface" cx="0.5" cy="0" r="0.9">
            <stop offset="0%" stopColor="#3b0d33" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#160418" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#000000" stopOpacity="1" />
          </radialGradient>

          <filter id="cosmicHorizonGlow" x="-20%" y="-120%" width="140%" height="340%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="cosmicHorizonSoft" x="-20%" y="-120%" width="140%" height="340%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* Dark planet surface below the horizon */}
        <path d="M -120 176 Q 720 44 1560 176 L 1560 460 L -120 460 Z" fill="url(#cosmicSurface)" />

        {/* Faint perspective rings across the surface */}
        <path d="M 40 300 Q 720 208 1400 300" className="cosmic-horizon__ring" />
        <path d="M -110 386 Q 720 262 1550 386" className="cosmic-horizon__ring" />
        <path d="M 250 246 Q 720 178 1190 246" className="cosmic-horizon__ring" />

        {/* Horizon glow, then the hot core line */}
        <path
          d="M -120 176 Q 720 44 1560 176"
          fill="none"
          stroke="url(#cosmicHorizonLine)"
          strokeWidth="34"
          opacity="0.5"
          filter="url(#cosmicHorizonGlow)"
        />
        <path
          d="M -120 176 Q 720 44 1560 176"
          fill="none"
          stroke="url(#cosmicHorizonLine)"
          strokeWidth="8"
          opacity="0.85"
          filter="url(#cosmicHorizonSoft)"
        />
        <path
          d="M -120 176 Q 720 44 1560 176"
          fill="none"
          stroke="url(#cosmicHorizonLine)"
          strokeWidth="2"
        />
      </svg>

      {/* Light running down both sides of the rim, then outwards along the
          horizon to the edges of the frame */}
      {trace && (
        <svg
          className="cosmic-trace"
          viewBox={`0 0 ${box.w} ${box.h}`}
          preserveAspectRatio="none"
          focusable="false"
        >
          <circle className="cosmic-trace__track" cx={trace.cx} cy={trace.cy} r={trace.radius} />

          {trace.routes.map((route) => (
            <g key={route.side} className={`cosmic-trace__run--${route.side}`}>
              <path className="cosmic-trace__glow" d={route.d} pathLength="1000" />
              <path className="cosmic-trace__line" d={route.d} pathLength="1000" />
              {/* Half a period apart, so between them the line is never dark */}
              <path className="cosmic-trace__stream" d={route.d} pathLength="1000" />
              <path
                className="cosmic-trace__stream"
                d={route.d}
                pathLength="1000"
                style={{ '--phase': '-0.8s' }}
              />
            </g>
          ))}
        </svg>
      )}

      {/* The descent — molten heat where the beam sinks into the depths */}
      <div className="cosmic-abyss">
        <div className="cosmic-abyss__heat" />
      </div>

      {/* Where the beam lands: burst, spill across the surface, mist */}
      <div className="cosmic-impact">
        <div className="cosmic-impact__pool" />
        <div className="cosmic-impact__bloom" />
      </div>
      <div className="cosmic-mist" />

      {/* Logo floating at the centre of the arc */}
      <div className="cosmic-sigil">
        <div className="cosmic-sigil__halo" />
        <div className="cosmic-sigil__ring" />
        <div className="cosmic-sigil__float">
          <img src={logo} alt="" className="cosmic-sigil__mark" />
          <img src={logo} alt="" className="cosmic-sigil__mark cosmic-sigil__mark--echo" />
        </div>
      </div>
    </div>
  );
};

export default HeroScene;
