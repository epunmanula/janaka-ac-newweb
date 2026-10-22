'use client';

import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ZoomIn, Play, Pause, Compass, Sparkles } from 'lucide-react';

export interface DriftWallItem {
  src: string;
  alt: string;
  label: string;
  category?: string;
  originalIndex: number;
}

export interface DriftWallProps {
  items: { src: string; alt: string; label: string; category?: string }[];
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  radius?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: 'up' | 'down';
  variance?: number;
  parallax?: number;
  lift?: number;
  className?: string;
  style?: CSSProperties;
  onSelectPhoto?: (index: number) => void;
}

interface ColumnMeta {
  copyHeight: number;
  copies: number;
}

const cx = (...parts: (string | false | undefined | null)[]) => parts.filter(Boolean).join(' ');

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const columnFactor = (index: number, variance: number): number => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

export const DriftWall: React.FC<DriftWallProps> = ({
  items,
  tileWidth = 270,
  tileHeight = 185,
  gap = 18,
  radius = 10,
  tilt = 12,
  turn = -8,
  roll = 0,
  depth = 80,
  speed = 34,
  direction = 'up',
  variance = 0.35,
  parallax = 0.5,
  lift = 48,
  className = '',
  style,
  onSelectPhoto,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const offsetsRef = useRef<number[]>([]);
  const velocitiesRef = useRef<number[]>([]);
  const hoveredColRef = useRef<number>(-1);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerDampedRef = useRef({ x: 0, y: 0 });
  const lastTsRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  const [containerHeight, setContainerHeight] = useState(560);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [reduced, setReduced] = useState(() => prefersReducedMotion());
  const [isPaused, setIsPaused] = useState(false);
  const [is3DMode, setIs3DMode] = useState(true);

  // Map incoming items with originalIndex
  const enrichedItems = useMemo<DriftWallItem[]>(() => {
    return items.map((item, index) => ({
      ...item,
      originalIndex: index,
    }));
  }, [items]);

  // Responsive columns count: 3 on mobile, 4 on tablet, 5 on desktop
  const columns = useMemo(() => {
    if (containerWidth < 600) return 3;
    if (containerWidth < 980) return 4;
    return 5;
  }, [containerWidth]);

  // Responsive gap
  const responsiveGap = useMemo(() => {
    if (containerWidth < 480) return 10;
    if (containerWidth < 600) return 12;
    if (containerWidth < 980) return 14;
    return gap;
  }, [containerWidth, gap]);

  // Responsive tile dimension tailored so all columns fit nicely
  const responsiveTileWidth = useMemo(() => {
    if (containerWidth < 480) {
      const available = containerWidth - 28;
      return Math.min(140, Math.max(96, Math.floor((available - 2 * 10) / 3)));
    }
    if (containerWidth < 600) {
      const available = containerWidth - 32;
      return Math.min(165, Math.max(120, Math.floor((available - 2 * 12) / 3)));
    }
    if (containerWidth < 980) return Math.min(tileWidth, 210);
    return tileWidth;
  }, [containerWidth, tileWidth]);

  const responsiveTileHeight = useMemo(() => {
    if (containerWidth < 600) {
      return Math.round(responsiveTileWidth * 0.72);
    }
    if (containerWidth < 980) return Math.min(tileHeight, 145);
    return tileHeight;
  }, [containerWidth, responsiveTileWidth, tileHeight]);

  const isMobile = containerWidth < 600;
  const planeScale = isMobile ? (containerWidth < 480 ? 1.0 : 1.04) : 1.12;
  const effectiveTilt = is3DMode ? (isMobile ? Math.min(tilt, 7) : tilt) : 0;
  const effectiveTurn = is3DMode ? (isMobile ? Math.min(turn, -4) : turn) : 0;
  const effectiveDepth = is3DMode ? (isMobile ? 20 : depth) : 0;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const columnItems = useMemo<DriftWallItem[][]>(() => {
    const cols: DriftWallItem[][] = Array.from({ length: columns }, () => []);
    enrichedItems.forEach((item, i) => cols[i % columns].push(item));
    return cols.map((col) => (col.length ? col : enrichedItems.slice(0, 1)));
  }, [enrichedItems, columns]);

  const columnMeta = useMemo<ColumnMeta[]>(() => {
    const unit = responsiveTileHeight + responsiveGap;
    return columnItems.map((col) => {
      const copyHeight = Math.max(unit, col.length * unit);
      const copies = Math.max(2, Math.ceil((containerHeight * 1.8) / copyHeight) + 1);
      return { copyHeight, copies };
    });
  }, [columnItems, responsiveTileHeight, responsiveGap, containerHeight]);

  // Use ResizeObserver with throttled state update
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      if (entry?.contentRect) {
        const h = Math.round(entry.contentRect.height);
        const w = Math.round(entry.contentRect.width);
        if (h > 0 && Math.abs(h - containerHeight) > 10) setContainerHeight(h);
        if (w > 0 && Math.abs(w - containerWidth) > 10) setContainerWidth(w);
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [containerHeight, containerWidth]);

  // Pause rAF when offscreen using IntersectionObserver (critical performance boost!)
  useEffect(() => {
    if (!containerRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    io.observe(containerRef.current);
    return () => io.disconnect();
  }, []);

  const baseVelocities = useMemo<number[]>(() => {
    const dirSign = direction === 'up' ? 1 : -1;
    return columnItems.map((_, c) => {
      const altSign = c % 2 === 0 ? 1 : -1;
      return speed * columnFactor(c, variance) * dirSign * altSign;
    });
  }, [columnItems, speed, direction, variance]);

  useEffect(() => {
    offsetsRef.current = columnMeta.map((meta, c) => meta.copyHeight * ((c * 0.37) % 1));
    velocitiesRef.current = columnItems.map(() => 0);
  }, [columnMeta, columnItems]);

  const applyPlaneTransform = useCallback(
    (px: number, py: number) => {
      const plane = planeRef.current;
      if (!plane) return;
      plane.style.transform =
        `translate(-50%, -50%) scale(${planeScale}) ` +
        `rotateX(${effectiveTilt + py}deg) rotateY(${effectiveTurn + px}deg) rotateZ(${roll}deg) ` +
        `translateZ(${-effectiveDepth}px)`;
    },
    [planeScale, effectiveTilt, effectiveTurn, roll, effectiveDepth]
  );

  // 60-120fps Smooth rAF loop without React re-renders
  useEffect(() => {
    let animId: number;

    const animate = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(0.05, Math.max(0, ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      if (isVisibleRef.current) {
        const maxTilt = parallax * 6;
        const targetX = pointerRef.current.x * maxTilt;
        const targetY = -pointerRef.current.y * maxTilt;
        const damp = 1 - Math.exp(-dt / 0.14);
        pointerDampedRef.current.x += (targetX - pointerDampedRef.current.x) * damp;
        pointerDampedRef.current.y += (targetY - pointerDampedRef.current.y) * damp;
        applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);

        if (!reduced) {
          for (let c = 0; c < trackRefs.current.length; c++) {
            const meta = columnMeta[c];
            if (!meta) continue;

            const isColHovered = hoveredColRef.current === c;
            const factor = isPaused || isColHovered ? 0 : 1;
            const target = baseVelocities[c] * factor;

            const ease = 1 - Math.exp(-dt / (target === 0 ? 0.2 : 0.3));
            velocitiesRef.current[c] += (target - velocitiesRef.current[c]) * ease;
            let next = (offsetsRef.current[c] ?? 0) + velocitiesRef.current[c] * dt;
            next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
            offsetsRef.current[c] = next;

            const el = trackRefs.current[c];
            if (el) {
              el.style.transform = `translate3d(0, ${-next}px, 0)`;
            }
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    rafRef.current = animId;

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [reduced, columnMeta, baseVelocities, parallax, isPaused, applyPlaneTransform]);

  // Fast pointer tracking without layout thrashing
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>): void => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    pointerRef.current = {
      x: Math.max(-1, Math.min(1, nx)),
      y: Math.max(-1, Math.min(1, ny)),
    };
  }, []);

  const handlePointerLeaveWall = useCallback((): void => {
    pointerRef.current = { x: 0, y: 0 };
    hoveredColRef.current = -1;
  }, []);

  const cssVars = useMemo<CSSProperties>(
    () =>
      ({
        '--dw-tile-w': `${responsiveTileWidth}px`,
        '--dw-tile-h': `${responsiveTileHeight}px`,
        '--dw-gap': `${responsiveGap}px`,
        '--dw-radius': `${isMobile ? 8 : radius}px`,
        '--dw-lift': `${isMobile ? 18 : lift}px`,
      } as CSSProperties),
    [responsiveTileWidth, responsiveTileHeight, responsiveGap, isMobile, radius, lift]
  );

  const tileClass = cx(
    'group/tile relative flex-shrink-0 cursor-pointer overflow-visible bg-transparent p-0 text-left outline-none',
    'w-[var(--dw-tile-w)] h-[var(--dw-tile-h)] mb-[var(--dw-gap)] [transform-style:preserve-3d]'
  );

  const innerClass = cx(
    'relative block h-full w-full overflow-hidden bg-[#161616]',
    'rounded-[var(--dw-radius)] opacity-90 [transform:translateZ(0)]',
    'transition-[transform,opacity,box-shadow,border-color] duration-[320ms] ease-out border border-[#262626]',
    'hover:opacity-100 hover:[transform:translateZ(var(--dw-lift))] hover:border-cyan-400/90',
    'hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9),0_0_0_1.5px_rgba(56,189,248,0.7)]',
    'focus-visible:opacity-100 focus-visible:[transform:translateZ(var(--dw-lift))] focus-visible:border-cyan-400'
  );

  const imgClass = cx(
    'block h-full w-full select-none object-cover',
    'filter saturate-[0.9] brightness-[0.92] contrast-[1.02]',
    'transition-[filter,transform] duration-[320ms] ease-out',
    'group-hover/tile:saturate-[1.15] group-hover/tile:brightness-[1.05] group-hover/tile:scale-105'
  );

  const overlayClass = cx(
    'pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080d12]/90 via-[#0a1622]/25 to-transparent opacity-60',
    'transition-opacity duration-[320ms] ease-out group-hover/tile:opacity-20'
  );

  const badgeClass = cx(
    'pointer-events-none absolute bottom-0 inset-x-0 p-2 sm:p-2.5 flex items-center justify-between gap-1',
    'text-white transition-opacity duration-[250ms] opacity-95 group-hover/tile:opacity-100'
  );

  const renderTile = (item: DriftWallItem, id: string, colIndex: number) => {
    return (
      <button
        key={id}
        type="button"
        tabIndex={0}
        aria-label={`Workshop photo: ${item.label}. Click to inspect in full resolution.`}
        className={tileClass}
        data-col={colIndex}
        onPointerEnter={() => {
          hoveredColRef.current = colIndex;
        }}
        onPointerLeave={() => {
          hoveredColRef.current = -1;
        }}
        onFocus={() => {
          hoveredColRef.current = colIndex;
        }}
        onBlur={() => {
          hoveredColRef.current = -1;
        }}
        onClick={() => onSelectPhoto?.(item.originalIndex)}
      >
        <span className={innerClass}>
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            className={imgClass}
          />
          <span className={overlayClass} aria-hidden="true" />
          <span className={badgeClass}>
            <span className="font-serif-editorial text-[11px] sm:text-xs tracking-tight text-[#F5F4EF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] truncate max-w-[80%]">
              {item.label}
            </span>
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-cyan-500/85 text-white grid place-items-center opacity-0 group-hover/tile:opacity-100 transition-opacity shadow-lg shrink-0">
              <ZoomIn className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
            </span>
          </span>
        </span>
      </button>
    );
  };

  return (
    <div className="relative w-full overflow-hidden select-none bg-[#0a0a0a] rounded-sm border border-[#222222] shadow-2xl">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 px-4 sm:px-6 py-3 border-b border-[#222222] z-20 relative text-xs font-mono-editorial text-[#888888] bg-[#121212]/95 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={cx(
                'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                isPaused ? 'bg-amber-400' : 'bg-cyan-400'
              )}
            />
            <span
              className={cx(
                'relative inline-flex rounded-full h-2.5 w-2.5',
                isPaused ? 'bg-amber-500' : 'bg-cyan-500'
              )}
            />
          </span>
          <span className="font-bold tracking-widest text-cyan-400 uppercase text-xs">
            {isPaused ? 'PAUSED' : 'LIVE 3D STREAM'}
          </span>
          <span className="text-[#444444] hidden sm:inline">•</span>
          <span className="text-[#888888] hidden sm:inline uppercase tracking-wider text-[11px]">
            GPU Accelerated • {columns} Columns Alternating
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#1a1a1a] hover:bg-[#252525] border border-[#2e2e2e] text-[#DCD9D0] transition-colors text-xs uppercase tracking-wider font-mono-editorial"
            aria-label={isPaused ? 'Resume drift stream' : 'Pause drift stream'}
          >
            {isPaused ? <Play className="w-3 h-3 text-cyan-400" /> : <Pause className="w-3 h-3 text-cyan-400" />}
            <span>{isPaused ? 'Play' : 'Pause'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIs3DMode(!is3DMode)}
            className={cx(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-sm border transition-colors text-xs uppercase tracking-wider font-mono-editorial',
              is3DMode
                ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300 font-medium'
                : 'bg-[#1a1a1a] border-[#2e2e2e] text-[#888888] hover:text-[#F5F4EF]'
            )}
            aria-label="Toggle 3D perspective orientation"
          >
            <Compass className="w-3 h-3" />
            <span>3D Angle</span>
          </button>
        </div>
      </div>

      {/* 3D Wall Canvas Container */}
      <section
        ref={containerRef}
        className={cx(
          'relative w-full h-[420px] sm:h-[500px] md:h-[580px] overflow-hidden cursor-grab active:cursor-grabbing',
          className
        )}
        style={{ ...cssVars, ...style }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeaveWall}
        aria-label="Workshop photos 3D drifting wall"
      >
        <div
          ref={planeRef}
          className="absolute left-1/2 top-1/2 flex flex-row [transform-style:preserve-3d] [transform-origin:50%_50%] will-change-transform"
        >
          {columnItems.map((col, c) => {
            const meta = columnMeta[c];
            const copies = Array.from({ length: meta.copies });
            return (
              <div
                className="relative w-[calc(var(--dw-tile-w)+var(--dw-gap))] [transform-style:preserve-3d]"
                key={`col-${c}`}
              >
                <div
                  className="flex flex-col [transform-style:preserve-3d] will-change-transform"
                  ref={(el) => {
                    trackRefs.current[c] = el;
                  }}
                >
                  {copies.map((_, copyIndex) =>
                    col.map((item, itemIndex) =>
                      renderTile(item, `${c}-${copyIndex}-${itemIndex}`, c)
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Hint Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-2.5 text-[11px] text-[#777777] border-t border-[#222222] bg-[#0e0e0e] font-mono-editorial gap-1.5">
        <span className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>Hover card to lift & pause column • Move cursor to tilt 3D perspective</span>
        </span>
        <span className="text-[#999999] flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Click any photo to zoom in full HD ({enrichedItems.length} workshop photos)</span>
        </span>
      </div>
    </div>
  );
};
