import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // ---- GrillMark brand palette (from the design handoff) ----
        cream: {
          DEFAULT: "#FBF6EE", // page background
          card: "#FFFDF8", // raised card
          light: "#FFF6EC", // cream text on dark
          soft: "#F5EDE0",
        },
        ink: "#231512", // near-black brand text
        brand: {
          DEFAULT: "#B52126", // primary red
          dark: "#9f1d21", // hover red
          deep: "#8E1A1E", // deep red
        },
        ember: "#E24F02", // orange accent
        tan: "#E8B27A",
        cocoa: "#200d0a", // dark brown sections
        clay: {
          DEFAULT: "#8a766c",
          600: "#7A6A60",
          700: "#6E5B52",
          800: "#54453d",
        },
        dot: "#7BE38B", // "online" green dot

        // ---- shadcn semantic tokens (CSS-variable driven) ----
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-hanken)", "system-ui", "sans-serif"],
        hanken: ["var(--font-hanken)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
        anton: ["var(--font-anton)", "sans-serif"],
        // Peridot PE is a proprietary brand font not shippable via chat;
        // falls back to Hanken until the .otf is added to /public/fonts.
        peridot: ["var(--font-peridot)", "var(--font-hanken)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "overlay-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "panel-in": {
          // Keep the -50%/-50% centering offset inside the keyframes; the
          // animation's `both` fill mode otherwise clobbers the translate
          // utilities and leaves the panel off-centre after it settles.
          from: {
            opacity: "0",
            transform: "translate(-50%,-50%) translateY(10px) scale(.965)",
          },
          to: {
            opacity: "1",
            transform: "translate(-50%,-50%) translateY(0) scale(1)",
          },
        },
      },
      animation: {
        "overlay-in": "overlay-in .18s ease both",
        "panel-in": "panel-in .24s cubic-bezier(.16,1,.3,1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
