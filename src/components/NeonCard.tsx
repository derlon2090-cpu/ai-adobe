import type { PropsWithChildren, ReactNode } from "react";

type NeonCardProps = PropsWithChildren<{
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
}>;

export function NeonCard({ title, subtitle, action, className = "", children }: NeonCardProps) {
  return (
    <section className={`glass-panel p-4 ${className}`}>
      {(title || subtitle || action) && (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            {typeof title === "string" ? <h3 className="text-lg font-semibold text-white">{title}</h3> : title}
            {typeof subtitle === "string" ? <p className="text-sm text-white/50">{subtitle}</p> : subtitle}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
