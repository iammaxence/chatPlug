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
        },
        forest: {
          DEFAULT: '#205613',
          light: '#9ddb8f',
        },
        latte: {
          DEFAULT: '#FFF9e8'
        },
        blossom: {
          DEFAULT: '#F6D3D6'
        },
        charcoal: {
          DEFAULT: '#232321'
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
