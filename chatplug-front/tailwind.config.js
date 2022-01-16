module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
            DEFAULT: "#17191A"
        },
        custom_gray: {
          DEFAULT: '#27292E'
        }
      }
    },
    fontFamily: {
      home: 'Bodo'
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
