import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata("terms-conditions");

export default function Page() {
  return <LegalPage slug="terms-conditions" />;
}
