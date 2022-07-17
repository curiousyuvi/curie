module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        xs: "1px",
      },
      animation: {
        shift: "shift 2s ease infinite",
      },
      keyframes: {
        shift: {
          "0%, 100%": { "background-position": "0% 0%" },
          "50%": { "background-position": "100% 0%" },
        },
      },
    },
  },
  plugins: [],
};
