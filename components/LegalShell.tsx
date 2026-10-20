import type { ReactNode } from "react";
import { FileText } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export default function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section aria-label={title}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          icon={<FileText size={32} aria-hidden="true" />}
          title={title}
          desc={`Last updated: ${updated}. Asher Print, Nairobi, Kenya.`}
        />
        <div className="space-y-6 leading-7 [&_h2]:!text-xl [&_h2]:!leading-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5">
          {children}
        </div>
      </div>
    </section>
  );
}
