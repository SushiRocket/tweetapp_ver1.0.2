/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Reactの全コンポーネントをTailwindの適用対象に
  ],
  safelist: [
    "bg-red-500",
    "text-white",
    "p-4",
    "rounded-lg",
  ], // ← これを追加！（削除されないようにする）
  theme: {
    extend: {},
  },
  plugins: [],
};
