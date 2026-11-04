/** Decorative graphic for the newsletter banner: an envelope and paper plane on a teal gradient (no photos, no covers). */
export function NewsletterArt() {
  return (
    <div aria-hidden className="relative isolate hidden min-h-60 items-center justify-center overflow-hidden bg-gradient-to-br from-teal/50 via-navy to-navy-deep md:row-span-2 md:flex">
      <div className="bg-dots absolute inset-0 -z-10 opacity-50" />
      <div className="absolute -bottom-16 -left-10 -z-10 size-56 rounded-full bg-amber/25 blur-2xl" />
      <div className="absolute -top-10 -right-6 -z-10 size-48 rounded-full border border-white/15" />
      <div className="absolute top-8 left-8 -z-10 size-24 rounded-full border border-white/10" />
      <svg viewBox="0 0 240 180" className="w-56 drop-shadow-2xl lg:w-64" fill="none">
        <rect x="30" y="50" width="150" height="100" rx="14" fill="#fff" />
        <path d="M34 58l71 52 71-52" stroke="#0a8fa6" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="54" y="112" width="50" height="8" rx="4" fill="#cfe6ee" />
        <rect x="54" y="128" width="74" height="8" rx="4" fill="#cfe6ee" />
        <path d="M150 20l70 26-24 12-12 30-16-22-30 8z" fill="#f5a623" />
        <path d="M150 20l46 38-4 20-12-30z" fill="#e08a00" />
        <path d="M118 44c-18 6-34 16-48 34" stroke="#f5a623" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 8" />
      </svg>
    </div>
  );
}
