import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useAppStore } from "../store/useAppStore";

export function ToastViewport() {
  const toasts = useAppStore((state) => state.toasts);
  const dismissToast = useAppStore((state) => state.dismissToast);

  useEffect(() => {
    const timers = toasts.map((toast) =>
      window.setTimeout(() => {
        dismissToast(toast.id);
      }, 2800)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [dismissToast, toasts]);

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 flex w-[320px] flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="glass-panel pointer-events-auto p-4"
          >
            <div className="text-sm font-semibold text-white">{toast.title}</div>
            <div className="mt-1 text-xs text-white/55">{toast.description}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
