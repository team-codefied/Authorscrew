import { Footer } from "@/components/Footer";
import { LandingHeader } from "@/components/Header";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LandingHeader />
      <main id="main">{children}</main>
      <Footer landing />
    </>
  );
}
