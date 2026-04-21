/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        mist: "#f0f7fa",
        skywash: "#e3f2f7",
        meadow: "#dff5e6",
        ink: "#0f2537",
        coral: "#ff8a65",
        warmCream: "#fef8f3",
        sage: "#8fb996",
        terracotta: "#d4745f",
        deepTeal: "#1a5f7a",
        softPeach: "#ffe5d9",
      },
      boxShadow: {
        soft: "0 8px 32px rgba(15, 37, 55, 0.08)",
        medium: "0 12px 48px rgba(15, 37, 55, 0.12)",
        glow: "0 0 40px rgba(143, 185, 150, 0.2)",
        card: "0 4px 20px rgba(15, 37, 55, 0.06)",
      },
      fontFamily: {
        sans: ['"Inter"', '"Segoe UI"', "ui-sans-serif", "system-ui"],
        display: ['"Playfair Display"', "Georgia", "serif"],
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top left, rgba(143,185,150,0.15), transparent 40%), radial-gradient(circle at bottom right, rgba(255,138,101,0.12), transparent 35%)",
        "warm-gradient": "linear-gradient(135deg, #fef8f3 0%, #f0f7fa 100%)",
        "impact-gradient": "linear-gradient(135deg, #dff5e6 0%, #e3f2f7 100%)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
