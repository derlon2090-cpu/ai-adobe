import { create } from "zustand";
import { cloneTimelineTracks, type Language } from "../data/mock";

type ToastItem = {
  id: number;
  title: string;
  description: string;
};

type AppState = {
  language: Language;
  projectName: string;
  selectedMediaClipId: string;
  selectedAudioTrackId: string;
  selectedElementId: string;
  selectedEffectId: string;
  selectedFilterId: string;
  selectedAiToolId: string;
  selectedProjectId: string;
  selectedPlanId: string;
  yearlyBilling: boolean;
  exportProgress: number;
  aiProgress: number;
  processing: boolean;
  timelineTracks: ReturnType<typeof cloneTimelineTracks>;
  toasts: ToastItem[];
  setLanguage: (language: Language) => void;
  setProjectName: (name: string) => void;
  selectMediaClip: (id: string) => void;
  selectAudioTrack: (id: string) => void;
  selectElement: (id: string) => void;
  selectEffect: (id: string) => void;
  selectFilter: (id: string) => void;
  selectAiTool: (id: string) => void;
  selectProject: (id: string) => void;
  selectPlan: (id: string) => void;
  toggleBilling: () => void;
  addClipToTimeline: (name: string, kind?: string) => void;
  pushToast: (title: string, description: string) => void;
  dismissToast: (id: number) => void;
  setExportProgress: (value: number) => void;
  setAiProgress: (value: number) => void;
  setProcessing: (value: boolean) => void;
};

let toastCounter = 1;
const initialLanguage = (typeof window !== "undefined" ? window.localStorage.getItem("orzain-language") : null) as Language | null;

export const useAppStore = create<AppState>((set) => ({
  language: initialLanguage ?? "ar",
  projectName: "Cyberpunk Trailer",
  selectedMediaClipId: "city-night",
  selectedAudioTrackId: "beyond-horizon",
  selectedElementId: "neon-frame",
  selectedEffectId: "glitch-impact",
  selectedFilterId: "cyberpunk",
  selectedAiToolId: "auto-cut",
  selectedProjectId: "cp-trailer",
  selectedPlanId: "pro",
  yearlyBilling: false,
  exportProgress: 0,
  aiProgress: 72,
  processing: false,
  timelineTracks: cloneTimelineTracks(),
  toasts: [],
  setLanguage: (language) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("orzain-language", language);
    }
    set({ language });
  },
  setProjectName: (projectName) => set({ projectName }),
  selectMediaClip: (selectedMediaClipId) => set({ selectedMediaClipId }),
  selectAudioTrack: (selectedAudioTrackId) => set({ selectedAudioTrackId }),
  selectElement: (selectedElementId) => set({ selectedElementId }),
  selectEffect: (selectedEffectId) => set({ selectedEffectId }),
  selectFilter: (selectedFilterId) => set({ selectedFilterId }),
  selectAiTool: (selectedAiToolId) => set({ selectedAiToolId }),
  selectProject: (selectedProjectId) => set({ selectedProjectId }),
  selectPlan: (selectedPlanId) => set({ selectedPlanId }),
  toggleBilling: () => set((state) => ({ yearlyBilling: !state.yearlyBilling })),
  addClipToTimeline: (name, kind = "Overlay") =>
    set((state) => {
      const trackIndex =
        kind === "Audio" ? state.timelineTracks.findIndex((track) => track.kind === "Audio") : state.timelineTracks.findIndex((track) => track.kind === "Overlay");

      if (trackIndex === -1) return state;

      const updatedTracks = state.timelineTracks.map((track, index) => {
        if (index !== trackIndex) return track;

        const nextStart = track.clips.length
          ? Math.max(...track.clips.map((clip) => clip.start + clip.length)) + 2
          : 4;

        return {
          ...track,
          clips: [
            ...track.clips,
            {
              id: `clip-${Date.now()}`,
              name,
              start: nextStart,
              length: 14,
              tone: kind === "Audio" ? "green" : "purple"
            }
          ]
        };
      });

      return { timelineTracks: updatedTracks };
    }),
  pushToast: (title, description) =>
    set((state) => ({
      toasts: [...state.toasts, { id: toastCounter++, title, description }]
    })),
  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    })),
  setExportProgress: (exportProgress) => set({ exportProgress }),
  setAiProgress: (aiProgress) => set({ aiProgress }),
  setProcessing: (processing) => set({ processing })
}));
