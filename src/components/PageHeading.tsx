import type { ReactNode } from "react";

type PageHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeading({ eyebrow, title, description, action }: PageHeadingProps) {
  return (
    <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {eyebrow ? <div className="section-label mb-3">{eyebrow}</div> : null}
        <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
        {description ? <p className="mt-2 max-w-3xl text-sm text-white/50">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
