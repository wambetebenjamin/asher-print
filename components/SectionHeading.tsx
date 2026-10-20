import type { ReactNode } from "react";

export default function SectionHeading({
  icon,
  title,
  desc,
}: {
  icon: ReactNode;
  title: string;
  desc?: string;
}) {
  return (
    <div className="heading-zip">
      <div className="flex items-start">
        <span className="title-icon-zip" aria-hidden="true">
          {icon}
        </span>
        <div>
          <h2 className="title-zip">{title}</h2>
          {desc ? <p className="title-desc-zip">{desc}</p> : null}
        </div>
      </div>
    </div>
  );
}
