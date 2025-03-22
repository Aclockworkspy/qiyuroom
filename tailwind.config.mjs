/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      // 添加了动画相关的自定义 keyframes 和 animation 名称
      keyframes: {
        slideLeftOnce: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-20vw)' } // 向左滑出 20vw
        },
      },
      animation: {
        slideLeftSlow: 'slideLeft 4.5s linear forwards',
      },
      // 到这里为止
    },
  },
  plugins: [],
};