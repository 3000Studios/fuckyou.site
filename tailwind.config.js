/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050505",
          900: "#0a0a0a",
          800: "#111113",
          700: "#17171a",
          600: "#1f1f24",
          500: "#2a2a31",
          400: "#3a3a44",
          300: "#55555f",
          200: "#8a8a94",
          100: "#cfcfd4",
          50: "#f5f5f7",
        },
        neon: {
          red: "#ff2a55",
          blue: "#29d8ff",
          amber: "#ffb347",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Space Grotesk",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,42,85,0.35), 0 10px 40px -10px rgba(255,42,85,0.35)",
        card: "0 10px 30px -12px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,1) 80%)",
        "red-glow":
          "radial-gradient(600px 300px at 20% 0%, rgba(255,42,85,0.15), transparent 60%)",
        "blue-glow":
          "radial-gradient(700px 350px at 80% 0%, rgba(41,216,255,0.12), transparent 60%)",
      },
      typography: {
        invert: {
          css: {
            "--tw-prose-body": "#cfcfd4",
            "--tw-prose-headings": "#ffffff",
            "--tw-prose-links": "#29d8ff",
          },
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
