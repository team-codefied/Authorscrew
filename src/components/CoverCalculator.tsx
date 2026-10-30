"use client";

import { useMemo, useState } from "react";

// Ported from the live site's KDP cover calculator so results match the original tool.
const PAPER = [
  { value: "white", label: "Black & White - White Paper", k: 0.002252 },
  { value: "cream", label: "Black & White - Cream Paper", k: 0.0025 },
  { value: "groundwood", label: "Black & White - Groundwood", k: 0.00235 },
  { value: "standard_color", label: "Standard Color", k: 0.002252 },
  { value: "premium_color", label: "Premium Color", k: 0.002347 },
];

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const num = (v: number, d = 4) => Number(v).toFixed(d).replace(/\.?0+$/, "");

function splitText(text: string, maxChars: number) {
  if (!text.trim()) return [];
  const lines: string[] = [];
  let line = "";
  text.trim().split(/\s+/).forEach((w) => {
    const test = line ? `${line} ${w}` : w;
    if (test.length > maxChars) {
      if (line) lines.push(line);
      line = w;
    } else line = test;
  });
  if (line) lines.push(line);
  return lines;
}

type Data = {
  width: number; height: number; pages: number; safe: number; bleed: number; spine: number;
  fullWidth: number; fullHeight: number; pixelsWidth: number; pixelsHeight: number; dpi: number; spineTextAllowed: boolean;
};

const field = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-[15px] focus:border-teal focus:ring-4 focus:ring-teal/15 focus:outline-none";
const lab = "mb-1 block text-sm font-medium text-ink";

export function CoverCalculator() {
  const [s, setS] = useState({
    width: "6", height: "9", pages: "300", paper: "white", direction: "ltr", units: "in", dpi: "300", safe: "0.25",
    title: "", author: "", back: "", bg: "#111827", text: "#ffffff", spineColor: "#1d4ed8",
    guides: true, barcode: true, spineGuide: true,
  });
  const [front, setFront] = useState<string | null>(null);
  const [back, setBack] = useState<string | null>(null);
  const set = <K extends keyof typeof s>(k: K, v: (typeof s)[K]) => setS((p) => ({ ...p, [k]: v }));

  const { data, warning } = useMemo<{ data: Data | null; warning: string }>(() => {
    const width = parseFloat(s.width), height = parseFloat(s.height), pages = parseInt(s.pages, 10), safe = parseFloat(s.safe), dpi = parseInt(s.dpi, 10);
    if (!width || width < 4 || width > 8.5) return { data: null, warning: "Trim width must be between 4 and 8.5 inches." };
    if (!height || height < 6 || height > 11.69) return { data: null, warning: "Trim height must be between 6 and 11.69 inches." };
    if (!pages || pages < 24 || pages > 830) return { data: null, warning: "Paperback page count must be between 24 and 830 pages." };
    if (isNaN(safe) || safe < 0 || safe > 1) return { data: null, warning: "Safe margin must be between 0 and 1 inch." };
    const bleed = 0.125;
    const spine = pages * (PAPER.find((p) => p.value === s.paper)?.k ?? 0.002252);
    const fullWidth = width * 2 + spine + bleed * 2;
    const fullHeight = height + bleed * 2;
    const spineTextAllowed = pages >= 79;
    return {
      data: { width, height, pages, safe, bleed, spine, fullWidth, fullHeight, dpi, spineTextAllowed, pixelsWidth: Math.round(fullWidth * dpi), pixelsHeight: Math.round(fullHeight * dpi) },
      warning: spineTextAllowed ? "" : "Spine text: KDP does not allow spine text on books with fewer than 79 pages.",
    };
  }, [s.width, s.height, s.pages, s.paper, s.safe, s.dpi]);

  const mm = s.units === "mm";
  const u = (inches: number) => `${num(mm ? inches * 25.4 : inches)} ${mm ? "mm" : "in"}`;

  const svg = useMemo(() => {
    if (!data) return "";
    const d = data, SC = 100;
    const W = d.fullWidth * SC, H = d.fullHeight * SC, bleed = d.bleed * SC, spine = d.spine * SC, tw = d.width * SC, th = d.height * SC, safe = d.safe * SC;
    const backX = bleed, spineX = bleed + tw, frontX = spineX + spine, ty = bleed;
    const title = esc(s.title || "BOOK TITLE"), author = esc(s.author || "AUTHOR NAME");
    let h = `<defs><clipPath id="kcsBackClip"><rect x="${backX}" y="${ty}" width="${tw}" height="${th}"/></clipPath><clipPath id="kcsFrontClip"><rect x="${frontX}" y="${ty}" width="${tw}" height="${th}"/></clipPath></defs>`;
    h += `<rect x="0" y="0" width="${W}" height="${H}" fill="${s.bg}"/>`;
    h += `<rect x="${backX}" y="${ty}" width="${tw}" height="${th}" fill="${s.bg}"/>`;
    h += `<rect x="${spineX}" y="${ty}" width="${spine}" height="${th}" fill="${s.spineColor}"/>`;
    h += `<rect x="${frontX}" y="${ty}" width="${tw}" height="${th}" fill="${s.bg}"/>`;
    if (back) h += `<image href="${back}" x="${backX}" y="${ty}" width="${tw}" height="${th}" preserveAspectRatio="xMidYMid slice" clip-path="url(#kcsBackClip)"/>`;
    if (front) h += `<image href="${front}" x="${frontX}" y="${ty}" width="${tw}" height="${th}" preserveAspectRatio="xMidYMid slice" clip-path="url(#kcsFrontClip)"/>`;
    const lines = splitText(s.back, Math.max(20, Math.floor(d.width * 6)));
    if (lines.length) {
      h += `<text x="${backX + tw / 2}" y="${ty + th * 0.25}" text-anchor="middle" fill="${s.text}" font-family="Arial, Helvetica, sans-serif" font-size="${Math.max(12, tw * 0.035)}" font-weight="500">`;
      lines.slice(0, 12).forEach((l, i) => { h += `<tspan x="${backX + tw / 2}" dy="${i === 0 ? 0 : Math.max(18, tw * 0.05)}">${esc(l)}</tspan>`; });
      h += "</text>";
    }
    h += `<text x="${frontX + tw / 2}" y="${ty + th * 0.3}" text-anchor="middle" fill="${s.text}" font-family="Georgia, serif" font-size="${Math.max(18, tw * 0.075)}" font-weight="700">${title}</text>`;
    h += `<text x="${frontX + tw / 2}" y="${ty + th * 0.78}" text-anchor="middle" fill="${s.text}" font-family="Arial, Helvetica, sans-serif" font-size="${Math.max(13, tw * 0.035)}">${author}</text>`;
    if (d.spineTextAllowed && d.spine > 0.25) {
      const cx = spineX + spine / 2, cy = ty + th / 2;
      h += `<g transform="rotate(${s.direction === "rtl" ? 90 : -90} ${cx} ${cy})"><text x="${cx}" y="${cy + 5}" text-anchor="middle" fill="${s.text}" font-family="Arial, Helvetica, sans-serif" font-size="${Math.max(10, Math.min(20, spine * 0.22))}" font-weight="700">${title}</text></g>`;
    }
    if (s.barcode) {
      const bw = Math.min(200, tw * 0.38), bh = bw * 0.6;
      const bx = s.direction === "rtl" ? backX + tw - bw - 20 : backX + 20, by = ty + th - bh - 20;
      h += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#ffffff" stroke="#111827" stroke-width="2"/><text x="${bx + bw / 2}" y="${by + bh / 2}" text-anchor="middle" fill="#111827" font-family="Arial" font-size="11">BARCODE AREA</text>`;
    }
    if (s.guides) {
      h += `<rect x="${bleed / 2}" y="${bleed / 2}" width="${W - bleed}" height="${H - bleed}" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="10 7"/>`;
      for (const x of [backX, spineX, frontX, frontX + tw]) h += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#16a34a" stroke-width="2"/>`;
      for (const x of [backX, frontX]) h += `<rect x="${x + safe}" y="${ty + safe}" width="${tw - safe * 2}" height="${th - safe * 2}" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="8 6"/>`;
    }
    if (s.spineGuide && d.spineTextAllowed) {
      const m = 0.0625 * SC;
      h += `<rect x="${spineX + m}" y="${ty + safe}" width="${Math.max(1, spine - m * 2)}" height="${th - safe * 2}" fill="none" stroke="#a855f7" stroke-width="2" stroke-dasharray="7 5"/>`;
    }
    if (s.guides) {
      for (const [x, t] of [[backX + tw / 2, "BACK"], [frontX + tw / 2, "FRONT"]] as const)
        h += `<text x="${x}" y="20" text-anchor="middle" fill="#ffffff" stroke="#000000" stroke-width="3" paint-order="stroke" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700">${t}</text>`;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${h}</svg>`;
  }, [data, s, front, back]);

  const download = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const downloadSVG = () => svg && download(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }), "kdp-cover-template.svg");
  const downloadPNG = () => {
    if (!svg || !data) return;
    const img = new Image();
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = data.pixelsWidth; c.height = data.pixelsHeight;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = s.bg; ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob((b) => b && download(b, `kdp-cover-${data.pixelsWidth}x${data.pixelsHeight}.png`), "image/png");
    };
    img.onerror = () => { URL.revokeObjectURL(url); alert("Could not create PNG. Try downloading SVG instead."); };
    img.src = url;
  };
  const printPDF = () => {
    if (!svg || !data) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<!doctype html><title>KDP cover template</title><style>@page{size:${data.fullWidth}in ${data.fullHeight}in;margin:0}html,body{margin:0}svg{width:${data.fullWidth}in;height:${data.fullHeight}in;display:block}</style>${svg}`);
    w.document.close(); w.focus();
    setTimeout(() => w.print(), 400);
  };
  const readFile = (f: File | undefined, cb: (v: string | null) => void) => {
    if (!f) return cb(null);
    const r = new FileReader();
    r.onload = (e) => cb(String(e.target?.result ?? ""));
    r.readAsDataURL(f);
  };

  const btn = "rounded-lg px-4 py-2.5 text-sm font-semibold transition";
  return (
    <div className="not-prose my-8 rounded-2xl bg-mist p-4 ring-1 ring-slate-200 sm:p-6" data-kcs>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
        <div className="grid content-start gap-5">
          <fieldset className="rounded-xl bg-white p-4">
            <legend className="px-1 font-semibold text-navy">1. Book Settings</legend>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={lab} htmlFor="kcs-w">Trim Width (in)</label><input id="kcs-w" className={field} type="number" min={4} max={8.5} step={0.001} value={s.width} onChange={(e) => set("width", e.target.value)} /></div>
              <div><label className={lab} htmlFor="kcs-h">Trim Height (in)</label><input id="kcs-h" className={field} type="number" min={6} max={11.69} step={0.001} value={s.height} onChange={(e) => set("height", e.target.value)} /></div>
              <div><label className={lab} htmlFor="kcs-p">Page Count</label><input id="kcs-p" className={field} type="number" min={24} max={830} value={s.pages} onChange={(e) => set("pages", e.target.value)} /></div>
              <div><label className={lab} htmlFor="kcs-s">Safe Margin (in)</label><input id="kcs-s" className={field} type="number" min={0} max={1} step={0.01} value={s.safe} onChange={(e) => set("safe", e.target.value)} /></div>
              <div className="col-span-2"><label className={lab} htmlFor="kcs-paper">Paper Type</label>
                <select id="kcs-paper" className={field} value={s.paper} onChange={(e) => set("paper", e.target.value)}>{PAPER.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}</select></div>
              <div><label className={lab} htmlFor="kcs-dir">Reading Direction</label>
                <select id="kcs-dir" className={field} value={s.direction} onChange={(e) => set("direction", e.target.value)}><option value="ltr">Left to Right</option><option value="rtl">Right to Left</option></select></div>
              <div><label className={lab} htmlFor="kcs-u">Units</label>
                <select id="kcs-u" className={field} value={s.units} onChange={(e) => set("units", e.target.value)}><option value="in">Inches</option><option value="mm">Millimeters</option></select></div>
              <div><label className={lab} htmlFor="kcs-dpi">DPI</label>
                <select id="kcs-dpi" className={field} value={s.dpi} onChange={(e) => set("dpi", e.target.value)}><option value="300">300 DPI</option><option value="150">150 DPI</option><option value="600">600 DPI</option></select></div>
            </div>
          </fieldset>

          <fieldset className="rounded-xl bg-white p-4">
            <legend className="px-1 font-semibold text-navy">2. Cover Text</legend>
            <div className="grid gap-3">
              <div><label className={lab} htmlFor="kcs-t">Book Title</label><input id="kcs-t" className={field} placeholder="Your Book Title" value={s.title} onChange={(e) => set("title", e.target.value)} /></div>
              <div><label className={lab} htmlFor="kcs-a">Author</label><input id="kcs-a" className={field} placeholder="Author Name" value={s.author} onChange={(e) => set("author", e.target.value)} /></div>
              <div><label className={lab} htmlFor="kcs-b">Back Cover Text</label><textarea id="kcs-b" rows={4} className={field} placeholder="Write your back cover description..." value={s.back} onChange={(e) => set("back", e.target.value)} /></div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className={lab} htmlFor="kcs-bg">Background</label><input id="kcs-bg" type="color" className="h-10 w-full rounded border border-slate-300" value={s.bg} onChange={(e) => set("bg", e.target.value)} /></div>
                <div><label className={lab} htmlFor="kcs-tc">Text</label><input id="kcs-tc" type="color" className="h-10 w-full rounded border border-slate-300" value={s.text} onChange={(e) => set("text", e.target.value)} /></div>
                <div><label className={lab} htmlFor="kcs-sc">Spine</label><input id="kcs-sc" type="color" className="h-10 w-full rounded border border-slate-300" value={s.spineColor} onChange={(e) => set("spineColor", e.target.value)} /></div>
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-xl bg-white p-4">
            <legend className="px-1 font-semibold text-navy">3. Cover Images</legend>
            <div className="grid gap-3 text-sm">
              <label className="grid gap-1">Front Cover Image<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => readFile(e.target.files?.[0], setFront)} /></label>
              <label className="grid gap-1">Back Cover Image<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => readFile(e.target.files?.[0], setBack)} /></label>
              <button type="button" onClick={() => { setFront(null); setBack(null); }} className={`${btn} border border-slate-300 text-slate-700 hover:bg-slate-50`}>Remove Images</button>
            </div>
          </fieldset>

          <fieldset className="rounded-xl bg-white p-4">
            <legend className="px-1 font-semibold text-navy">4. Template Options</legend>
            <div className="grid gap-2 text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" checked={s.guides} onChange={(e) => set("guides", e.target.checked)} />Show bleed / trim / safe guides</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={s.barcode} onChange={(e) => set("barcode", e.target.checked)} />Show barcode area</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={s.spineGuide} onChange={(e) => set("spineGuide", e.target.checked)} />Show spine safe area</label>
            </div>
          </fieldset>

          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={downloadSVG} disabled={!data} className={`${btn} bg-amber text-navy hover:bg-amber-dark disabled:opacity-50`}>Download SVG</button>
            <button type="button" onClick={downloadPNG} disabled={!data} className={`${btn} bg-navy text-white hover:bg-teal-dark disabled:opacity-50`}>Download PNG</button>
            <button type="button" onClick={printPDF} disabled={!data} className={`${btn} border border-navy text-navy hover:bg-navy hover:text-white disabled:opacity-50`}>Print / Save PDF</button>
          </div>
          {warning && <p role="alert" className="rounded-lg bg-amber/15 p-3 text-sm text-amber-text">{warning}</p>}
        </div>

        <div className="min-w-0">
          <dl className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Spine", data ? u(data.spine) : "-"],
              ["Full Width", data ? u(data.fullWidth) : "-"],
              ["Full Height", data ? u(data.fullHeight) : "-"],
              ["Pixels", data ? `${data.pixelsWidth} × ${data.pixelsHeight}` : "-"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-white p-3 text-center"><dt className="text-xs tracking-wide text-slate-500 uppercase">{k}</dt><dd className="mt-1 font-semibold text-navy" aria-live="polite">{v}</dd></div>
            ))}
          </dl>
          <div className="overflow-auto rounded-xl bg-white p-2" aria-label="Cover template preview">
            {svg ? <div className="[&>svg]:h-auto [&>svg]:max-w-full" dangerouslySetInnerHTML={{ __html: svg }} /> : <p className="p-8 text-center text-slate-500">Enter valid book settings to preview the template.</p>}
          </div>
          {data && (
            <table className="mt-4 w-full overflow-hidden rounded-xl bg-white text-sm">
              <caption className="p-3 text-left font-semibold text-navy">Calculated Measurements</caption>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Trim Size", `${num(mm ? data.width * 25.4 : data.width)} × ${u(data.height)}`],
                  ["Spine", u(data.spine)],
                  ["Bleed", u(data.bleed)],
                  ["Safe Margin", u(data.safe)],
                  ["Full Cover", `${num(mm ? data.fullWidth * 25.4 : data.fullWidth)} × ${u(data.fullHeight)}`],
                  [`${data.dpi} DPI`, `${data.pixelsWidth} × ${data.pixelsHeight} px @ ${data.dpi} DPI`],
                  ["Spine Text", data.spineTextAllowed ? "Allowed" : "Not allowed below 79 pages"],
                ].map(([k, v]) => (
                  <tr key={k}><th scope="row" className="w-40 p-3 text-left font-medium text-slate-600">{k}</th><td className="p-3">{v}</td></tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
