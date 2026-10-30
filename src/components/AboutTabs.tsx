"use client";

import { useId, useState } from "react";

export type Tab = { label: string; title: string; paragraphs: string[] };

export function AboutTabs({ tabs, onCta }: { tabs: Tab[]; onCta?: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const uid = useId();
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setActive((a) => (a + 1) % tabs.length);
    if (e.key === "ArrowLeft") setActive((a) => (a - 1 + tabs.length) % tabs.length);
  };
  return (
    <div>
      <div role="tablist" aria-label="About Authors Crew" onKeyDown={onKey} className="mb-8 flex flex-wrap justify-center gap-3">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            role="tab"
            id={`${uid}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${uid}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
              active === i ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-slate-300 hover:ring-teal"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.label}
          role="tabpanel"
          id={`${uid}-panel-${i}`}
          aria-labelledby={`${uid}-tab-${i}`}
          hidden={active !== i}
          className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-10"
        >
          <h3 className="font-serif text-2xl font-medium text-navy sm:text-3xl">{t.title}</h3>
          <div className="mt-4 grid gap-4 text-lg leading-relaxed text-slate-600">
            {t.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {onCta && <div className="mt-6">{onCta}</div>}
        </div>
      ))}
    </div>
  );
}
