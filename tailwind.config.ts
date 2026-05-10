import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          950: "#040610",
          900: "#070b16",
          850: "#0a1020",
          800: "#0d1426",
          750: "#111a30"
        },
        neon: {
          purple: "#9b5cff",
          violet: "#7c3aed",
          blue: "#2563eb",
          cyan: "#1fd6ff",
          aqua: "#4ce6d2",
          lime: "#49e89d"
        }
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(142,90,255,0.12), 0 24px 70px rgba(72, 30, 140, 0.35)",
        cyan: "0 0 0 1px rgba(31,214,255,0.14), 0 22px 60px rgba(11, 99, 148, 0.28)"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      backgroundImage: {
        "cyber-grid":
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
} satisfies Config;
