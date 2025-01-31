/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit", // ← Just-In-Time (JIT) モードを明示的に有効化
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Reactの全コンポーネントをTailwindの適用対象に
    "./public/index.html", // ← これがなければ追加！
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
