module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'black': '#057d8d',
        'dark': '#53565A',
        'primary': '#C8102E',
        'warning': '#f7ec54',
        'success': '#74c545',
        'link': '#ff4d4d',
        'info': '#ffa6a6',
      },
      fontFamily: {
        'sans' : ['DIN Next LT Pro', 'Helvetica', 'Arial', 'sans-serif']
      }      
    },
  },
  plugins: [],
}
