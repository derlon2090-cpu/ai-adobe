import type { PropsWithChildren, ReactNode } from "react";

type RightInspectorProps = PropsWithChildren<{
  title: string;
  action?: ReactNode;
  className?: string;
}>;

export function RightInspector({ title, action, className = "", children }: RightInspectorProps) {
  return (
    <aside className={`glass-panel p-4 ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        {action}
      </div>
      {children}
    </aside>
  );
}
