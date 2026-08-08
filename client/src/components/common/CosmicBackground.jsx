import { useEffect, useRef } from 'react';

const STAR_TINTS = ['#ffffff', '#e9d5ff', '#f9a8d4', '#c7d2fe', '#fde68a'];
const EMBER_TINTS = ['#fb923c', '#f97316', '#ec4899', '#fbbf24'];

/**
 * The ambient cosmic ground behind the whole site: nebula wash, drifting
 * clouds, a live starfield with embers and the occasional comet, then grain
 * and a vignette on top.
 *
 * Mounted once in App and fixed to the viewport, so it costs the same on a
 * short page as a long one and never runs twice. The hero's foreground —
 * planet, beam, horizon, sigil — is <HeroScene>, which renders only there.
 */
const CosmicBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let stars = [];
    let embers = [];
    let comet = null;
    let nextCometAt = 3000;
    let animationId;
    let dpr = 1;

    /* Sprite cache for the glowing dots.
       ctx.shadowBlur runs a gaussian blur per draw call, and this loop draws
       up to ~450 dots a frame — that alone was the most expensive thing on
       the page. Each unique dot is rasterised once here instead and then
       blitted with drawImage, which is a plain texture copy. Radii are
       quantised so the cache stays at a few dozen entries. */
    const sprites = new Map();

    const getSprite = (color, radius, glow) => {
      const r = Math.max(Math.round(radius * 4) / 4, 0.25);
      const key = `${color}|${r}|${glow}`;
      const cached = sprites.get(key);
      if (cached) return cached;

      const half = r + glow;
      const size = Math.max(Math.ceil(half * 2 * dpr), 2);
      const off = document.createElement('canvas');
      off.width = size;
      off.height = size;

      const octx = off.getContext('2d');
      octx.setTransform(dpr, 0, 0, dpr, 0, 0);
      octx.fillStyle = color;
      octx.shadowBlur = glow;
      octx.shadowColor = color;
      octx.beginPath();
      octx.arc(half, half, r, 0, Math.PI * 2);
      octx.fill();

      const sprite = { canvas: off, half };
      sprites.set(key, sprite);
      return sprite;
    };

    const blit = (sprite, x, y) =>
      ctx.drawImage(sprite.canvas, x - sprite.half, y - sprite.half, sprite.half * 2, sprite.half * 2);

    const seedStars = () => {
      const target = Math.round((width * height) / 6500);
      const count = Math.min(Math.max(target, 90), 340);

      stars = Array.from({ length: count }, () => {
        const bright = Math.random() > 0.92;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: bright ? Math.random() * 1.1 + 1 : Math.random() * 0.8 + 0.3,
          alpha: bright ? Math.random() * 0.35 + 0.6 : Math.random() * 0.4 + 0.2,
          twinkle: Math.random() * 1.8 + 0.4,
          phase: Math.random() * Math.PI * 2,
          drift: Math.random() * 0.025 + 0.008,
          color: STAR_TINTS[Math.floor(Math.random() * STAR_TINTS.length)],
          bright,
        };
      });
    };

    /* Embers drifting up from below — denser towards the middle of the frame. */
    const makeEmber = (seeded) => {
      const bias = (Math.random() + Math.random() + Math.random()) / 3; // clusters mid-screen
      return {
        x: width * (0.08 + bias * 0.84) + (Math.random() - 0.5) * width * 0.12,
        y: seeded ? height * (0.6 + Math.random() * 0.42) : height * (0.94 + Math.random() * 0.12),
        radius: Math.random() * 1.4 + 0.5,
        rise: Math.random() * 0.55 + 0.22,
        sway: Math.random() * 0.5 + 0.15,
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.5 + 0.3,
        color: EMBER_TINTS[Math.floor(Math.random() * EMBER_TINTS.length)],
      };
    };

    const seedEmbers = () => {
      const count = Math.min(Math.max(Math.round(width / 14), 32), 110);
      embers = Array.from({ length: count }, () => makeEmber(true));
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      // Capped at 2: beyond that the canvas costs 4x the fill rate for a
      // starfield nobody can resolve anyway.
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
      if (nextDpr !== dpr) sprites.clear();
      dpr = nextDpr;

      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars();
      seedEmbers();
    };

    const spawnComet = () => {
      const fromLeft = Math.random() > 0.5;
      const speed = Math.random() * 3 + 4;
      comet = {
        x: fromLeft ? -60 : width + 60,
        y: Math.random() * height * 0.45,
        vx: fromLeft ? speed : -speed,
        vy: speed * (Math.random() * 0.35 + 0.25),
        life: 1,
      };
    };

    const drawStars = (time) => {
      stars.forEach((star) => {
        const flicker = reduceMotion
          ? 1
          : 0.55 + 0.45 * Math.sin(time * 0.001 * star.twinkle + star.phase);

        ctx.globalAlpha = Math.max(star.alpha * flicker, 0);
        blit(getSprite(star.color, star.radius, star.bright ? 8 : 0), star.x, star.y);

        if (!reduceMotion) {
          star.y -= star.drift;
          if (star.y < -2) {
            star.y = height + 2;
            star.x = Math.random() * width;
          }
        }
      });
      ctx.globalAlpha = 1;
    };

    const drawEmbers = (time) => {
      ctx.globalCompositeOperation = 'lighter';

      embers.forEach((ember, index) => {
        // Fade out as the ember climbs away from the bottom of the frame.
        const climb = 1 - Math.min(Math.max((height - ember.y) / (height * 0.55), 0), 1);
        ctx.globalAlpha = Math.max(ember.alpha * climb, 0);
        blit(getSprite(ember.color, ember.radius, 6), ember.x, ember.y);

        if (!reduceMotion) {
          ember.y -= ember.rise;
          ember.x += Math.sin(time * 0.0006 + ember.phase) * ember.sway * 0.4;
          if (ember.y < height * 0.42) embers[index] = makeEmber(false);
        }
      });

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const drawComet = (delta) => {
      if (!comet) {
        nextCometAt -= delta;
        if (nextCometAt <= 0) {
          spawnComet();
          nextCometAt = Math.random() * 9000 + 6000;
        }
        return;
      }

      comet.x += comet.vx;
      comet.y += comet.vy;
      comet.life -= 0.006;

      const tailX = comet.x - comet.vx * 16;
      const tailY = comet.y - comet.vy * 16;
      const gradient = ctx.createLinearGradient(comet.x, comet.y, tailX, tailY);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${Math.max(comet.life, 0) * 0.9})`);
      gradient.addColorStop(0.4, `rgba(236, 72, 153, ${Math.max(comet.life, 0) * 0.35})`);
      gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(comet.x, comet.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();

      const offscreen = comet.x < -120 || comet.x > width + 120 || comet.y > height + 120;
      if (comet.life <= 0 || offscreen) comet = null;
    };

    const paint = (time, delta) => {
      ctx.clearRect(0, 0, width, height);
      drawStars(time);
      drawEmbers(time);
      if (delta !== null) drawComet(delta);
    };

    let lastTime = performance.now();
    const render = (time) => {
      // Clamped: coming back to a backgrounded tab hands us one enormous delta,
      // which would otherwise fire a burst of comets at once.
      const delta = Math.min(time - lastTime, 100);
      lastTime = time;
      paint(time, delta);
      animationId = requestAnimationFrame(render);
    };

    resize();

    if (reduceMotion) {
      paint(0, null);
    } else {
      animationId = requestAnimationFrame(render);
    }

    const observer = new ResizeObserver(() => {
      resize();
      if (reduceMotion) paint(0, null);
    });
    observer.observe(parent);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      sprites.clear();
    };
  }, []);

  return (
    <div className="cosmic-bg" aria-hidden="true">
      {/* Deep space wash, nebula clouding + texture */}
      <div className="cosmic-nebula" />
      <div className="cosmic-fog" />
      <div className="cosmic-cloud cosmic-cloud--purple" />
      <div className="cosmic-cloud cosmic-cloud--pink" />

      {/* Star field + embers */}
      <canvas ref={canvasRef} className="cosmic-stars" />

      {/* Texture + vignette on top of everything */}
      <div className="cosmic-grain" />
      <div className="cosmic-vignette" />
    </div>
  );
};

export default CosmicBackground;
