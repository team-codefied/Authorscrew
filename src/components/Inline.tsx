import Link from "next/link";
import type { ReactNode } from "react";

/** Renders the **bold**, _italic_ and [text](href) markers produced when page content was extracted. */
export function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|_([^_]+)_|\[([^\]]+)\]\(([^)]*)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  const cls = "font-medium text-teal-dark underline hover:text-navy";
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<strong key={m.index}><Inline text={m[1]} /></strong>);
    else if (m[2]) parts.push(<em key={m.index}>{m[2]}</em>);
    else {
      const href = m[4].replace(/\s/g, "");
      const external = /^(https?:|mailto:|tel:)/.test(href);
      parts.push(
        external ? (
          <a key={m.index} href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={cls}>{m[3]}</a>
        ) : (
          <Link key={m.index} href={href || "/"} className={cls}>{m[3]}</Link>
        ),
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
