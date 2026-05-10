import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sidebar } from "./components/Sidebar";
import { Timeline } from "./components/Timeline";
import { ToastViewport } from "./components/ToastViewport";
import { TopHeader } from "./components/TopHeader";
import { TopHero } from "./components/TopHero";
import { useAppStore } from "./store/useAppStore";
import { navigationItems } from "./data/mock";
import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { MediaPage } from "./pages/MediaPage";
import { AudioPage } from "./pages/AudioPage";
import { ColorPage } from "./pages/ColorPage";
import { ElementsPage } from "./pages/ElementsPage";
import { EffectsPage } from "./pages/EffectsPage";
import { FiltersPage } from "./pages/FiltersPage";
import { AIToolsPage } from "./pages/AIToolsPage";
import { ExportPage } from "./pages/ExportPage";
import { CollaboratePage } from "./pages/CollaboratePage";
import { SubscriptionsPage } from "./pages/SubscriptionsPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";

const timelineRoutes = new Set([
  "/media",
  "/audio",
  "/color",
  "/elements",
  "/effects",
  "/filters",
  "/ai-tools",
  "/export",
  "/collaborate"
]);

function Shell() {
  const location = useLocation();
  const language = useAppStore((state) => state.language);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const active = navigationItems.find((item) => item.route === location.pathname);
    document.title = active ? `Orzain Video Pro 26 — ${active.label.en}` : "Orzain Video Pro 26";
  }, [location.pathname]);

  return (
    <div className="mx-auto min-h-screen max-w-[1840px] px-4 py-5 xl:px-6">
      <TopHero />

      <div className="overflow-hidden rounded-[2rem] border border-white/8 bg-black/25 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_120px_rgba(6,12,33,0.75)] backdrop-blur-xl">
        <div className="grid min-h-[840px] grid-cols-[290px,1fr]">
          <Sidebar />

          <div className="flex min-h-[840px] flex-col">
            <TopHeader />

            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="px-4 py-4 lg:px-5 lg:py-5"
                >
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/media" element={<MediaPage />} />
                    <Route path="/audio" element={<AudioPage />} />
                    <Route path="/text" element={<PlaceholderPage mode="text" />} />
                    <Route path="/elements" element={<ElementsPage />} />
                    <Route path="/transitions" element={<PlaceholderPage mode="transitions" />} />
                    <Route path="/effects" element={<EffectsPage />} />
                    <Route path="/filters" element={<FiltersPage />} />
                    <Route path="/overlays" element={<PlaceholderPage mode="overlays" />} />
                    <Route path="/ai-tools" element={<AIToolsPage />} />
                    <Route path="/color" element={<ColorPage />} />
                    <Route path="/export" element={<ExportPage />} />
                    <Route path="/collaborate" element={<CollaboratePage />} />
                    <Route path="/account" element={<PlaceholderPage mode="account" />} />
                    <Route path="/settings" element={<PlaceholderPage mode="settings" />} />
                    <Route path="/subscriptions" element={<SubscriptionsPage />} />
                    <Route path="/help-support" element={<PlaceholderPage mode="help" />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </motion.div>
              </div>
            </div>

            {timelineRoutes.has(location.pathname) ? <Timeline /> : null}
          </div>
        </div>
      </div>

      <ToastViewport />
    </div>
  );
}

export default function App() {
  return <Shell />;
}
