import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { PopupProvider } from "@/components/PopupProvider";
import { SITE } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Authors Crew | Book Publishing, Ghostwriting & Marketing", template: "%s | Authors Crew" },
  description: "Authors Crew helps authors write, edit, design, publish and market their books while keeping 100% of their rights and royalties.",
  openGraph: { siteName: SITE.name, type: "website", images: ["/images/main-banner.webp"] },
  icons: { icon: "/images/favicon.webp" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="antialiased">
        <PopupProvider>{children}</PopupProvider>
      </body>
    </html>
  );
}
