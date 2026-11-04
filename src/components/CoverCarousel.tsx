"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Container } from "./ui";
import { CAROUSELS, type CarouselItem } from "@/lib/img";

type Props = {
  title?: string;
  intro?: string;
  set?: keyof typeof CAROUSELS;
  className?: string;
  children?: ReactNode;
};

/** Books visible at once for the current viewport. */
function useVisible() {
  const [n, setN] = useState(5);
  useEffect(() => {
    const read = () => setN(window.innerWidth >= 1024 ? 5 : window.innerWidth >= 640 ? 3 : 2);
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);
  return n;
}

/** The single book-cover section on each page: a looping, swipeable row of real Authors Crew covers. */
export function CoverCarousel({
  title = "Global Publishing Success Stories",
  intro = "Discover books we’ve brought to life and launched across leading platforms. Each project reflects the author’s voice, ready to reach readers worldwide.",
  set = "default",
  className = "",
  children,
}: Props) {
  const items: CarouselItem[] = CAROUSELS[set];
  const visible = useVisible();
  const last = Math.max(0, items.length - visible);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef<{ x: number; id: number } | null>(null);

  const at = Math.min(index, last);
  const go = useCallback((dir: 1 | -1) => setIndex((i) => (dir === 1 ? (i >= last ? 0 : i + 1) : i <= 0 ? last : i - 1)), [last]);

  useEffect(() => {
    if (paused || last === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(1), 4500);
    return () => clearInterval(t);
  }, [paused, last, go]);

  const onDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, id: e.pointerId };
  };
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  const btn =
    "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-2xl leading-none font-bold text-amber shadow-[var(--shadow-card)] ring-1 ring-slate-200 transition hover:bg-amber hover:text-navy";

  return (
    <section className={`bg-white py-16 sm:py-20 ${className}`} aria-label={title} aria-roledescription="carousel">
      <Container>
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="font-serif text-3xl leading-tight font-medium text-navy sm:text-4xl">{title}</h2>
          <span aria-hidden className="mx-auto mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-teal to-amber" />
          <p className="mt-5 text-lg leading-relaxed text-slate-600">{intro}</p>
        </div>

        <div
          className="relative px-6 sm:px-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <button type="button" onClick={() => go(-1)} aria-label="Previous books" className={`${btn} left-0`}>
            &#8249;
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next books" className={`${btn} right-0`}>
            &#8250;
          </button>

          <div className="touch-pan-y overflow-hidden py-6" onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={() => (drag.current = null)}>
            <ul
              className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${at * (100 / visible)}%)` }}
              aria-live={paused ? "polite" : "off"}
            >
              {items.map((b, i) => {
                const shown = i >= at && i < at + visible;
                return (
                  <li
                    key={b.src}
                    className="flex shrink-0 items-end justify-center px-3"
                    style={{ width: `${100 / visible}%` }}
                    aria-hidden={!shown}
                  >
                    <Image
                      src={b.src}
                      alt={b.alt}
                      width={300}
                      height={450}
                      draggable={false}
                      sizes="(min-width:1024px) 220px, 45vw"
                      className={
                        b.flat
                          ? "h-auto w-full max-w-[200px] rounded-md shadow-[var(--shadow-book)] select-none"
                          : "h-auto w-full max-w-[220px] drop-shadow-[0_18px_18px_rgba(0,24,42,0.25)] select-none"
                      }
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <ul className="mt-4 flex justify-center gap-2">
          {Array.from({ length: last + 1 }, (_, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show books ${i + 1}`}
                aria-current={i === at}
                className={`block size-2.5 rounded-full transition ${i === at ? "scale-125 bg-teal" : "bg-amber"}`}
              />
            </li>
          ))}
        </ul>
        {children && <div className="mt-8 text-center">{children}</div>}
      </Container>
    </section>
  );
}
