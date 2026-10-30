"use client";

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { LeadForm } from "./LeadForm";

const Ctx = createContext<{ openQuote: () => void }>({ openQuote: () => {} });
export const useQuotePopup = () => useContext(Ctx);

export function PopupProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const openQuote = useCallback(() => ref.current?.showModal(), []);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClick = (ev: MouseEvent) => {
      if (ev.target === d) d.close(); // click on backdrop
    };
    d.addEventListener("click", onClick);
    return () => d.removeEventListener("click", onClick);
  }, []);

  return (
    <Ctx.Provider value={{ openQuote }}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="quote-title"
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl p-0 shadow-2xl backdrop:bg-navy/70 backdrop:backdrop-blur-sm"
      >
        <div className="relative max-h-[90vh] overflow-y-auto p-6 sm:p-8">
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Close"
            className="absolute top-3 right-3 grid size-9 place-items-center rounded-full text-2xl text-slate-500 hover:bg-slate-100"
          >
            &times;
          </button>
          <h2 id="quote-title" className="font-serif text-2xl font-semibold text-navy">
            Start Your Author Journey
          </h2>
          <p className="mt-1 mb-5 text-sm text-slate-600">
            Tell us about your book and a publishing consultant will get back to you within one business day.
          </p>
          <LeadForm variant="journey" submitLabel="Get Consultation" />
        </div>
      </dialog>
    </Ctx.Provider>
  );
}

export function QuoteButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { openQuote } = useQuotePopup();
  return (
    <button type="button" onClick={openQuote} className={className}>
      {children}
    </button>
  );
}
