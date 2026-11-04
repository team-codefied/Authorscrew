"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "./ui";
import { CAROUSELS, type CarouselItem } from "@/lib/img";

type Props = {
  title?: string;
  intro?: string;
  set?: keyof typeof CAROUSELS;
  className?: string;
  children?: ReactNode;
};

/** The single book-cover section on each page: a swipeable row of real Authors Crew covers. */
export function CoverCarousel({
  title = "Global Publishing Success Stories",
  intro = "Discover books we’ve brought to life and launched across leading platforms. Each project reflects the author’s voice, ready to reach readers worldwide.",
  set = "default",
  className = "",
  children,
}: Props) {
  const items: CarouselItem[] = CAROUSELS[set];
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const step = useCallback(() => {
    const el = track.current;
    const first = el?.children[0] as HTMLElement | undefined;
    return first ? first.offsetWidth : 200;
  }, []);

  const onScroll = useCallback(() => {
    const el = track.current;
    if (el) setActive(Math.min(items.length - 1, Math.round(el.scrollLeft / step())));
  }, [items.length, step]);

  const go = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
  const jump = (i: number) => track.current?.scrollTo({ left: i * step(), behavior: "smooth" });

  useEffect(() => {
    onScroll();
  }, [onScroll]);

  return (
    <section className={`bg-white py-16 sm:py-20 ${className}`} aria-label={title}>
      <Container>
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="font-serif text-3xl leading-tight font-medium text-navy sm:text-4xl">{title}</h2>
          <span aria-hidden className="mx-auto mt-4 block h-1 w-16 rounded-full bg-gradient-to-r from-teal to-amber" />
          <p className="mt-5 text-lg leading-relaxed text-slate-600">{intro}</p>
        </div>

        <div className="relative">
          <button type="button" onClick={() => go(-1)} aria-label="Previous books" className="absolute top-1/2 -left-1 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-xl font-bold text-amber shadow-[var(--shadow-card)] ring-1 ring-slate-200 transition hover:bg-amber hover:text-navy sm:-left-4">
            &#8249;
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next books" className="absolute top-1/2 -right-1 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white text-xl font-bold text-amber shadow-[var(--shadow-card)] ring-1 ring-slate-200 transition hover:bg-amber hover:text-navy sm:-right-4">
            &#8250;
          </button>

          <ul
            ref={track}
            onScroll={onScroll}
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth px-2 py-6"
            aria-label="Published books"
          >
            {items.map((b) => (
              <li key={b.src} className="flex w-1/2 shrink-0 snap-start items-end justify-center px-3 sm:w-1/3 lg:w-1/5">
                <Image
                  src={b.src}
                  alt={b.alt}
                  width={300}
                  height={450}
                  sizes="(min-width:1024px) 220px, 45vw"
                  className={
                    b.flat
                      ? "h-auto w-full max-w-[200px] rounded-md shadow-[var(--shadow-book)] transition duration-300 hover:-translate-y-2"
                      : "h-auto w-full max-w-[220px] drop-shadow-[0_18px_18px_rgba(0,24,42,0.25)] transition duration-300 hover:-translate-y-2"
                  }
                />
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-4 flex justify-center gap-2" aria-hidden>
          {items.map((b, i) => (
            <li key={b.src}>
              <button type="button" tabIndex={-1} onClick={() => jump(i)} className={`block size-2.5 rounded-full transition ${i === active ? "scale-125 bg-teal" : "bg-amber"}`} />
            </li>
          ))}
        </ul>
        {children && <div className="mt-8 text-center">{children}</div>}
      </Container>
    </section>
  );
}
