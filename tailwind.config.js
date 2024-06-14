/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
  ],
  theme: {
    screens: {
      'xs': '729px',
      'sm': '768px',
      'md': '1024px',
      'lg': '1280px',
      'xl': '1440px',
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      // ---------------------------------
      'main-black': '#303030',
      'default-black': '#000000',
      'brown': '#D8D2C2',
      'light-brown': '#EDEBE5',
      'dark-brown': '#A99F8A',
      'orange': '#DBBA61',
      'light-gray': '#c5c1b6;',
    },

    container: {
      padding: '20px',
      center: true
    },
    extend: {
      fontFamily: {
        'bodyFont': ['archangelsk', 'regular'],
      }
    }
  },
  plugins: [],
}

