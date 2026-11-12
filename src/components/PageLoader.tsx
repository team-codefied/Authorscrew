"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const MIN_VISIBLE_MS = 700;
const FAILSAFE_MS = 9000;
export const NAVIGATE_EVENT = "ac:navigate";

/** Branded full-screen transition shown while the next page loads. */
export function PageLoader() {
  const path = usePathname();
  const [active, setActive] = useState(false);
  const startedAt = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const failsafe = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const current = useRef(path);

  const show = useCallback(() => {
    clearTimeout(hideTimer.current);
    clearTimeout(failsafe.current);
    startedAt.current = Date.now();
    setActive(true);
    failsafe.current = setTimeout(() => setActive(false), FAILSAFE_MS);
  }, []);

  // Start on internal link clicks, browser back/forward and programmatic navigation.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || /^(mailto|tel):/.test(a.getAttribute("href") ?? "")) return;
      if (url.pathname === location.pathname) return; // same page or hash jump
      show();
    };
    const onPop = () => show();
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPop);
    window.addEventListener(NAVIGATE_EVENT, show);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPop);
      window.removeEventListener(NAVIGATE_EVENT, show);
    };
  }, [show]);

  // The new route has rendered: finish after the minimum display time.
  useEffect(() => {
    if (current.current === path) return;
    current.current = path;
    const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - startedAt.current));
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      clearTimeout(failsafe.current);
      setActive(false);
    }, wait);
  }, [path]);

  useEffect(() => {
    document.documentElement.classList.toggle("is-navigating", active);
  }, [active]);

  return (
    <div className="page-loader" data-active={active} role="status" aria-live="polite" aria-hidden={!active}>
      <span className="sr-only">{active ? "Loading page" : ""}</span>
      <div className="page-loader__bar" aria-hidden />
      <div className="page-loader__stage" aria-hidden>
        <div className="page-loader__glow" />
        <svg className="page-loader__ring" viewBox="0 0 200 200" fill="none">
          <defs>
            <linearGradient id="pl-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#00b0cc" />
              <stop offset="1" stopColor="#f5a623" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="92" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <circle className="page-loader__arc" cx="100" cy="100" r="92" stroke="url(#pl-grad)" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <div className="page-loader__logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt="" width={500} height={234} />
          <span className="page-loader__shine" />
        </div>
        <svg className="page-loader__pen" viewBox="0 0 260 24" fill="none">
          <path d="M6 14 C 50 2, 90 22, 130 12 S 210 4, 254 12" stroke="#f5a623" strokeWidth="4" strokeLinecap="round" pathLength="1" />
        </svg>
        <p className="page-loader__text">Turning the page</p>
      </div>
    </div>
  );
}
