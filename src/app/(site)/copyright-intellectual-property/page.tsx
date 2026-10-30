import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata("copyright-intellectual-property");

export default function Page() {
  return <LegalPage slug="copyright-intellectual-property" />;
}
